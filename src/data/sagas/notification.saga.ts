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

/** => notification total */
function* notificationTotal() {
  try {
    const response: models.DetailSuccessProps<models.NotificationTotalSuccess> =
      yield call(() => {
        return NotificationApi.notificationTotal();
      });

    yield put(ActionCreators.notificationTotalSuccess(response));
  } catch (error) {
    yield put(
      ActionCreators.notificationTotalFailed(error as models.ErrorProps),
    );
  }
}
/** === LISTEN FUNCTION === */
function* NotificationSaga() {
  yield takeLatest(types.NOTIFICATION_LIST_PROCESS, notificationList);
  yield takeLatest(types.NOTIFICATION_TOTAL_PROCESS, notificationTotal);
}

export default NotificationSaga;
