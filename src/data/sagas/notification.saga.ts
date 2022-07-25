/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { NotificationApi } from '../apis/notification.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => notification list */
function* notificationList(
  action: models.ListProcessV3Action<{ perPage: number }>,
) {
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
    yield action.contextDispatch(
      ActionCreators.notificationListFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.notificationListFailed(error as models.ErrorProps),
    );
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

/** notification mark read & refresh data */
function* notificationMarkRead(
  action: models.CreateProcessAction<models.NotificationListSuccessProps>,
) {
  try {
    const { id } = action.payload.data;
    // post mark read
    try {
      // skip error catch
      yield call(() => NotificationApi.notificationMarkRead(id));
    } catch (error) {}
    // success mark read
    yield put(ActionCreators.notificationMarkReadSuccess());
    // refresh get list notification
    yield put(ActionCreators.notificationListReset());
    yield action.contextDispatch(ActionCreators.notificationListReset());
    yield put(
      ActionCreators.notificationListProcess(action.contextDispatch, {
        loading: true,
        page: 1,
        perPage: 10,
      }),
    );
  } catch (error) {
    // has some error
    yield put(
      ActionCreators.notificationMarkReadFailed(error as models.ErrorProps),
    );
  }
}
/** === LISTEN FUNCTION === */
function* NotificationSaga() {
  yield takeLatest(types.NOTIFICATION_LIST_PROCESS, notificationList);
  yield takeLatest(types.NOTIFICATION_TOTAL_PROCESS, notificationTotal);
  yield takeLatest(types.NOTIFICATION_MARK_READ_PROCESS, notificationMarkRead);
}

export default NotificationSaga;
