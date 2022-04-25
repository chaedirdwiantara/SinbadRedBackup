/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import * as PaymentHistoryApi from 'src/data/apis/oms/payment-history.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** History Waiting Payment List */
function* OrderHistoryListPayment(action: models.ListProcessV3Action) {
  try {
    const response: models.ListSuccessV3Props<Array<models.WaitingPaymentListHistory>> =
      yield call(() => {
        return PaymentHistoryApi.getOrderHistoryListPayment(
          action.payload as models.PaymentListHistoryProcessProps,
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
function* PaymentHistorySaga() {
  yield takeLatest(types.ORDER_HISTORY_LIST_PAYMENT_PROCESS, OrderHistoryListPayment );
}

export default PaymentHistorySaga;
