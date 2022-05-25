import { takeLatest, put, call } from 'redux-saga/effects';
import { registerApi } from '../apis/register.api';
import * as types from '@types';
import * as ActionCreators from '@actions';
import * as models from '@models';

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

/** check phone no */
function* checkPhoneV2(
  action: models.IRegisterAction<models.ICheckPhoneV2Process>,
) {
  try {
    const response: models.ICheckPhoneV2Success = yield call(() =>
      registerApi.checkPhoneV2(action.payload),
    );
    yield put(ActionCreators.checkPhoneV2Success(response));
  } catch (error) {
    yield put(ActionCreators.checkPhoneV2Failed(error));
  }
}

/** check autologin after register */
function* checkAutoLogin(
  action: models.IRegisterAction<models.ICheckAutoLoginProcess>,
) {
  try {
    const response: models.ICheckAutoLoginSuccess = yield call(() =>
      registerApi.checkAutoLogin(action.payload),
    );
    yield put(ActionCreators.checkAutoLoginSuccess(response));
  } catch (error) {
    yield put(ActionCreators.checkAutoLoginFailed(error));
  }
}

function* RegisterSaga() {
  yield takeLatest(types.VERIFY_OTP_REGISTER_PROCESS, verifyOTPRegister);
  yield takeLatest(
    types.CHECK_EMAIL_AVAILABILITY_PROCESS,
    checkEmailAvailability,
  );
  yield takeLatest(types.CHECK_PHONE_V2_PROCESS, checkPhoneV2);
  yield takeLatest(types.CHECK_AUTO_LOGIN_PROCESS, checkAutoLogin);
}

export default RegisterSaga;
