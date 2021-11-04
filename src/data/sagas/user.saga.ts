/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { UserApi } from '../apis/user.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => list example */
function* storeDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.StoreDetail> = yield call(
      () => {
        return UserApi.storeDetail();
      },
    );
    yield action.contextDispatch(ActionCreators.storeDetailSuccess(response));
    yield put(ActionCreators.storeDetailSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.storeDetailFailed(error));
    yield put(ActionCreators.storeDetailFailed(error));
  }
}
/** => change password  */
function* changePassword(action: models.UpdateProcessAction) {
  try {
    const response: models.UpdateSuccessProps = yield call(() => {
      return UserApi.changePassword(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.changePasswordSuccess(response),
    );
    yield put(ActionCreators.changePasswordSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.changePasswordFailed(error));
    yield put(ActionCreators.changePasswordFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* UserSaga() {
  yield takeLatest(types.STORE_DETAIL_PROCESS, storeDetail);
  yield takeLatest(types.CHANGE_PASSWORD_PROCESS, changePassword);
}

export default UserSaga;
