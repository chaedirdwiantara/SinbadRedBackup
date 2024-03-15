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
        //get detail store not send store id. store id is handled at backend
        return UserApi.storeDetail();
      },
    );
    yield action.contextDispatch(ActionCreators.storeDetailSuccess(response));
    yield put(ActionCreators.storeDetailSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.storeDetailFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.storeDetailFailed(error as models.ErrorProps));
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
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.changePasswordFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.changePasswordFailed(error as models.ErrorProps));
  }
}
/** => update badge profile  */
function* updateBadgeProfile(action: models.UpdateProcessAction<{}>) {
  try {
    const response: models.UpdateSuccessV3Props<models.UpdateBadgeProfileResponse> =
      yield call(() => {
        return UserApi.updateBadgeProfile();
      });
    yield action.contextDispatch(
      ActionCreators.updateBadgeProfileSuccess(response),
    );
    yield put(ActionCreators.updateBadgeProfileSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.updateBadgeProfileFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.updateBadgeProfileFailed(error as models.ErrorProps),
    );
  }
}
/** === LISTEN FUNCTION === */
function* UserSaga() {
  yield takeLatest(types.STORE_DETAIL_PROCESS, storeDetail);
  yield takeLatest(types.CHANGE_PASSWORD_PROCESS, changePassword);
  yield takeLatest(types.UPDATE_BADGE_PROFILE_PROCESS, updateBadgeProfile);
}

export default UserSaga;
