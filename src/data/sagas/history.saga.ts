/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { PaymentStatusApi } from 'src/data/apis/history/list-history/payment-status.api';
import { HistoryPaymentApi } from '../apis/history/history-payment.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** => list example */
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
/** === FUNCTIONS === */
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

/** === LISTENER === */
function* HistorySaga() {
  yield takeLatest(types.PAYMENT_STATUS_LIST_PROCESS, paymentStatusList);
  yield takeLatest(types.HISTORY_PAYMENT_DETAIL_PROCESS, paymentDetail);
  yield takeLatest(types.HISTORY_INVOICE_DETAIL_PROCESS, paymentInvoice);
}

export default HistorySaga;
