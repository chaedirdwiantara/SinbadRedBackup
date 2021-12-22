import { takeLatest, put, call, delay } from 'redux-saga/effects';
import { registerApi } from '../apis/register.api';
import * as types from '@types';
import * as ActionCreators from '@actions';
import * as models from '@models';

/** check phone no */
function* checkPhoneNoAvailability(
  action: models.IRegisterAction<models.ICheckPhoneNoAvailabilityProcess>,
) {
  try {
    const response: models.ICheckPhoneNoAvailabilitySuccess = yield call(() =>
      registerApi.checkPhoneNoAvailability(action.payload),
    );
    yield put(ActionCreators.checkPhoneNoAvailabilitySuccess(response));
  } catch (error) {
    yield put(ActionCreators.checkPhoneNoAvailabilityFailed(error));
  }
}

/** check email */
function* checkEmailAvailability(
  action: models.IRegisterAction<models.ICheckEmailAvailabilityProcess>,
) {
  try {
    const response: models.ICheckEmailAvailabilitySuccess = yield call(() =>
      registerApi.checkEmailAvailability(action.payload),
    );
    yield put(ActionCreators.checkEmailAvailabilitySuccess(response));
  } catch (error) {
    yield put(ActionCreators.checkEmailAvailabilityFailed(error));
  }
}

function* checkRegister(data: models.IRegisterMerchantSuccess) {
  for (let i = 0; i < 5; i++) {
    try {
      const response: models.IRegisterMerchantDetail = yield call(() =>
        registerApi.registermerchantDetail(data),
      );
      if (
        response.data.status === 'done' ||
        response.data.status === 'failed'
      ) {
        return response;
      }
      throw new Error();
    } catch (err) {
      if (i < 4) {
        yield delay(2000);
      } else {
        throw new Error('Check self registration failed');
      }
    }
  }
}

/** register merchant */
function* registerMerchant(
  action: models.IRegisterAction<models.IMerchantData>,
) {
  try {
    const response: models.IRegisterMerchantSuccess = yield call(() =>
      registerApi.registerMerchant(action.payload),
    );
    const registerResult: models.IRegisterMerchantDetail = yield call(() =>
      checkRegister(response),
    );
    yield put(ActionCreators.merchantRegisterSuccess(registerResult));
  } catch (error) {
    yield put(ActionCreators.merchantRegisterFailed(error));
  }
}

function* verifyOTPRegister(
  action: models.IRegisterAction<models.IVerifyOTPRegister>,
) {
  try {
    const response: models.IVerifyOTPSuccess = yield call(() =>
      registerApi.verifyOTPRegister(action.payload),
    );
    yield put(ActionCreators.verifyOTPRegisterSuccess(response));
  } catch (error) {
    yield put(ActionCreators.verifyOTPRegisterFailed(error));
  }
}

function* RegisterSaga() {
  yield takeLatest(types.REGISTER_MERCHANT_PROCESS, registerMerchant);
  yield takeLatest(types.VERIFY_OTP_REGISTER_PROCESS, verifyOTPRegister);
  yield takeLatest(
    types.CHECK_PHONE_AVAILABILITY_PROCESS,
    checkPhoneNoAvailability,
  );
  yield takeLatest(
    types.CHECK_EMAIL_AVAILABILITY_PROCESS,
    checkEmailAvailability,
  );
}

export default RegisterSaga;
