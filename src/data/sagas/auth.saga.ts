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
    yield put(ActionCreators.loginUserNameFailed(error));
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
    yield put(ActionCreators.logoutFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* AuthSaga() {
  yield takeLatest(types.LOGIN_USERNAME_PROCESS, loginUserName);
  yield takeLatest(types.LOGOUT_PROCESS, logout);
}

export default AuthSaga;
