import { takeLatest, put, call } from 'redux-saga/effects';
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

/** register merchant */
function* registerMerchant(
  action: models.IRegisterAction<models.IRegisterMerchantProcess>,
) {
  try {
    const registerReponse: models.IRegisterMerchantSuccess = yield call(() =>
      registerApi.registerMerchant(action.payload),
    );
    if (registerReponse) {
      const response: models.IRegisterMerchantDetail = yield call(() =>
        registerApi.registermerchantDetail(registerReponse),
      );
      yield put(ActionCreators.merchantRegisterSuccess(response));
    }
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
