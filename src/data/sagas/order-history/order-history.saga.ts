/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import * as OrderHistoryApi from 'src/data/apis/order-history/order-history.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** History List */
function* OrderHistoryList(action: models.ListProcessV3Action) {
  try {
    const response: models.ListSuccessV3Props<Array<models.OrderListHistory>> =
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
      ActionCreators.orderHistoryListFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.orderHistoryListFailed(error as models.ErrorProps),
    );
  }
}

/** History Waiting Payment List */
function* OrderHistoryListPayment(action: models.ListProcessV3Action) {
  try {
    const response: models.ListSuccessV3Props<Array<models.WaitingPaymentListHistory>> =
      yield call(() => {
        return OrderHistoryApi.getOrderHistoryListPayment(
          action.payload as models.OrderListHistoryProcessProps,
        );
      });
    yield action.contextDispatch(
      ActionCreators.orderHistoryListPaymentSuccess(response),
    );
    yield put(ActionCreators.orderHistoryListPaymentSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.orderHistoryListPaymentFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.orderHistoryListPaymentFailed(error as models.ErrorProps),
    );
  }
}

/** === LISTENER === */
function* OrderHistorySaga() {
  yield takeLatest(types.ORDER_HISTORY_LIST_PROCESS, OrderHistoryList);
  yield takeLatest(types.ORDER_HISTORY_LIST_PAYMENT_PROCESS, OrderHistoryListPayment );
}

export default OrderHistorySaga;
