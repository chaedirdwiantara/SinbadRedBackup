/** === IMPORT PACKAGE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { HistoryOrderApi } from 'src/data/apis/history/history-order.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** Cart View */
function* orderStatus(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.OrderStatusSuccessProps> =
      yield call(() => {
        return HistoryOrderApi.orderStatus();
      });
    yield action.contextDispatch(ActionCreators.orderStatusSuccess(response));
    yield put(ActionCreators.orderStatusSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.orderStatusFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.orderStatusFailed(error as models.ErrorProps));
  }
}
/** === LISTENER === */
function* HistorySaga() {
  yield takeLatest(types.HISTORY_ORDER_STATUS_PROCESS, orderStatus);
}

export default HistorySaga;
