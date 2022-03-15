/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import * as OrderHistoryApi from 'src/data/apis/order-history/order-history.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** History List */
function* OrderHistoryList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<Array<models.OrderListHistory>> =
      yield call(() => {
        return OrderHistoryApi.getOrderHistoryList(
          action.payload as models.OrderListHistoryProcessProps,
        );
      });
    yield action.contextDispatch(
      ActionCreators.orderHistoryListSuccess(response),
    );
    yield put(ActionCreators.orderHistoryListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.historyListFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.historyListFailed(error as models.ErrorProps));
  }
}

/** === LISTENER === */
function* OrderHistorySaga() {
  yield takeLatest(types.ORDER_HISTORY_LIST_PROCESS, OrderHistoryList);
}

export default OrderHistorySaga;
