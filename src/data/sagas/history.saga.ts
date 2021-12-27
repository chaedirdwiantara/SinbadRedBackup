/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { HistoryOrderApi } from 'src/data/apis/history/history-order.api';
import { HistoryPaymentApi } from 'src/data/apis/history/history-payment.api';
import { PaymentStatusApi } from 'src/data/apis/history/list-history/payment-status.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** Payment Status List */
function* paymentStatusList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.IPaymentStatusList[]> =
      yield call(() => {
        return PaymentStatusApi.paymentStatusList(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.paymentStatusListSuccess(response),
    );
    yield put(ActionCreators.paymentStatusListSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.paymentStatusListFailed(error));
    yield put(ActionCreators.paymentStatusListFailed(error));
  }
}
/** Order Status List */
function* orderStatusList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<Array<models.OrderStatus>> =
      yield call(() => {
        return HistoryOrderApi.getOrderStatus();
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
/** History List */
function* historyList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<Array<models.OrderParcels>> =
      yield call(() => {
        return HistoryOrderApi.getHistoryList(
          action.payload as models.HistoryListProcessProps,
        );
      });
    yield action.contextDispatch(ActionCreators.historyListSuccess(response));
    yield put(ActionCreators.historyListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.historyListFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.historyListFailed(error as models.ErrorProps));
  }
}
/** Payment Detail */
function* paymentDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.PaymentDetailSuccessProps> =
      yield call(() => {
        return HistoryPaymentApi.paymentDetail(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.historyPaymentDetailSuccess(response),
    );
    yield put(ActionCreators.historyPaymentDetailSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.historyPaymentDetailFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.historyPaymentDetailFailed(error as models.ErrorProps),
    );
  }
}
/** Payment Invoice */
function* paymentInvoice(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.PaymentInvoiceSuccessProps> =
      yield call(() => {
        return HistoryPaymentApi.paymentInvoiceDetail(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.historyPaymentInvoiceDetailSuccess(response),
    );
    yield put(ActionCreators.historyPaymentInvoiceDetailSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.historyPaymentInvoiceDetailFailed(
        error as models.ErrorProps,
      ),
    );
    yield put(
      ActionCreators.historyPaymentInvoiceDetailFailed(
        error as models.ErrorProps,
      ),
    );
  }
}
/** => History Detail */
function* historyDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.HistoryDetail> =
      yield call(() => {
        return HistoryOrderApi.getDetail(action.payload);
      });
    yield action.contextDispatch(ActionCreators.historyDetailSuccess(response));
    yield put(ActionCreators.historyDetailSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.historyDetailFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.historyDetailFailed(error as models.ErrorProps));
  }
}
/**=> ACTIVATE VA */
function* activateVa(action: models.UpdateProcessAction) {
  try {
    const response: models.UpdateSuccessProps = yield call(() => {
      return HistoryPaymentApi.activateVA(action.payload);
    });
    yield action.contextDispatch(
      ActionCreators.historyActivateVASuccess(response),
    );
    yield put(ActionCreators.historyActivateVASuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.historyActivateVAFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.historyActivateVAFailed(error as models.ErrorProps),
    );
  }
}
/** === LISTENER === */
function* HistorySaga() {
  yield takeLatest(types.PAYMENT_STATUS_LIST_PROCESS, paymentStatusList);
  yield takeLatest(types.HISTORY_ORDER_STATUS_PROCESS, orderStatusList);
  yield takeLatest(types.HISTORY_LIST_PROCESS, historyList);
  yield takeLatest(types.HISTORY_PAYMENT_DETAIL_PROCESS, paymentDetail);
  yield takeLatest(types.HISTORY_INVOICE_DETAIL_PROCESS, paymentInvoice);
  yield takeLatest(types.HISTORY_DETAIL_PROCESS, historyDetail);
  yield takeLatest(types.HISTORY_ACTIVATE_VA_PROCESS, activateVa);
}

export default HistorySaga;
