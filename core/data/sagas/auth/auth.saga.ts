/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { AuthApi } from '../../apis/auth/auth.api';
import * as ActionCreators from '../../actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => login with username and password */
function* loginUserName(action: models.LoginUserNameProcessAction) {
  try {
    const response: models.LoginSuccess = yield call(() => {
      return AuthApi.loginUserName(action.payload);
    });
    yield put(ActionCreators.loginUserNameSuccess(response));
    yield put(ActionCreators.meProcess());
  } catch (error: any) {
    yield put(ActionCreators.loginUserNameFailed(error));
  }
}
/** => request OTP */
function* requestOTP(action: models.RequestOTPProcessAction) {
  try {
    const response: models.OtpGetSuccess = yield call(() => {
      return AuthApi.requestOTP(action.payload);
    });
    yield put(ActionCreators.requestOTPSuccess(response));
  } catch (error: any) {
    yield put(ActionCreators.requestOTPFailed(error));
  }
}
/** => verification OTP */
function* verificationOTP(action: models.VerificationOTPProcessAction) {
  try {
    const response: models.LoginSuccess = yield call(() => {
      return AuthApi.verificationOTP(action.payload);
    });
    yield put(ActionCreators.verificationOTPSuccess(response, action.payload));
    yield put(ActionCreators.meProcess());
    yield put(ActionCreators.meV2Process());
  } catch (error: any) {
    yield put(ActionCreators.verificationOTPFailed(error));
  }
}
/** => me */
function* me() {
  try {
    const response: models.LoginSuccess = yield call(() => {
      return AuthApi.me();
    });
    yield put(ActionCreators.meSuccess(response));
  } catch (error: any) {
    yield put(ActionCreators.meFailed(error));
  }
}
/** => logout */
function* logout() {
  try {
    const response: models.LogoutSuccess = yield call(() => {
      return AuthApi.logout();
    });
    yield put(ActionCreators.logoutSuccess(response));
  } catch (error: any) {
    yield put(ActionCreators.logoutFailed(error));
  }
}
/** => me V2 */
function* meV2() {
  try {
    const response: models.LoginSuccess = yield call(() => {
      return AuthApi.meV2();
    });
    yield put(ActionCreators.meV2Success(response));
  } catch (error: any) {
    yield put(ActionCreators.meV2Failed(error));
  }
}

/** => check phone */
function* checkPhoneLogin(
  action: models.IAction<models.ICheckPhoneLogin>
) {  
  try {
    const response: models.ICheckPhoneLoginSuccess = yield call(() => {
      return AuthApi.checkPhoneLogin(action.payload);
    });
    yield put(ActionCreators.checkPhoneLoginSuccess(response));
  } catch (error: any) {
    yield put(ActionCreators.checkPhoneLoginFailed(error));
  }
}

/** === LISTEN FUNCTION === */
function* AuthCoreSaga() {
  yield takeLatest(types.LOGIN_USERNAME_PROCESS, loginUserName);
  yield takeLatest(types.REQUEST_OTP_PROCESS, requestOTP);
  yield takeLatest(types.VERIFICATION_OTP_PROCESS, verificationOTP);
  yield takeLatest(types.ME_PROCESS, me);
  yield takeLatest(types.LOGOUT_PROCESS, logout);
  yield takeLatest(types.ME_V2_PROCESS, meV2);
  yield takeLatest(types.CHECK_PHONE_LOGIN_PROCESS, checkPhoneLogin)
}

export default AuthCoreSaga;
