/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { NotificationApi } from '../apis/notification.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => notification list */
function* notificationList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.NotificationListSuccessProps> =
      yield call(() => {
        return NotificationApi.notificationList(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.notificationListSuccess(response),
    );
    yield put(ActionCreators.notificationListSuccess(response));
  } catch (error: any) {
    // yield action.contextDispatch(ActionCreators.brandListFailed(error));
    yield put(ActionCreators.notificationListSuccess(error));
  }
}
/** === LISTEN FUNCTION === */
function* BrandSaga() {
  yield takeLatest(types.NOTIFICATION_LIST_PROCESS, notificationList);
}

export default BrandSaga;
