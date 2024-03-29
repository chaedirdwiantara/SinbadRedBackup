/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { AuthApi } from '../apis/auth.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => login with username and password */
function* loginUserName(action: models.LoginUserNameProcessAction) {
  try {
    const response: models.LoginSuccessProps = yield call(() => {
      return AuthApi.loginUserName(action.payload);
    });
    yield put(ActionCreators.loginUserNameSuccess(response));
  } catch (error) {
    yield put(ActionCreators.loginUserNameFailed(error as models.ErrorProps));
  }
}
/** => request OTP */
function* requestOTP(action: models.RequestOTPProcessAction) {
  try {
    const response: models.OtpGetSuccessProps = yield call(() => {
      return AuthApi.requestOTP(action.payload);
    });
    yield put(ActionCreators.requestOTPSuccess(response));
  } catch (error) {
    yield put(ActionCreators.requestOTPFailed(error as models.ErrorProps));
  }
}
/** => verification OTP */
function* verificationOTP(action: models.VerificationOTPProcessAction) {
  try {
    const response: models.LoginSuccessProps = yield call(() => {
      return AuthApi.verificationOTP(action.payload);
    });
    yield put(ActionCreators.verificationOTPSuccess(response));
  } catch (error) {
    yield put(ActionCreators.verificationOTPFailed(error as models.ErrorProps));
  }
}
/** => logout */
function* logout() {
  try {
    const response: models.LogoutSuccesProps = yield call(() => {
      return AuthApi.logout();
    });
    yield put(ActionCreators.logoutSuccess(response));
  } catch (error) {
    yield put(ActionCreators.logoutFailed(error as models.ErrorProps));
  }
}
/** => Auth me */
function* authMe() {
  try {
    const response: models.AuthMeSuccess = yield call(() => {
      return AuthApi.getAuthMe;
    });
    yield put(ActionCreators.authMeSuccess(response));
  } catch (error) {
    yield put(ActionCreators.authMeFailed(error as models.ErrorProps));
  }
}

/** === LISTEN FUNCTION === */
function* AuthSaga() {
  yield takeLatest(types.LOGIN_USERNAME_PROCESS, loginUserName);
  yield takeLatest(types.REQUEST_OTP_PROCESS, requestOTP);
  yield takeLatest(types.VERIFICATION_OTP_PROCESS, verificationOTP);
  yield takeLatest(types.LOGOUT_PROCESS, logout);
  yield takeLatest(types.AUTH_ME_PROCESS, authMe);
}

export default AuthSaga;
