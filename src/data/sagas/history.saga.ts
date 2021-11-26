/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { PaymentStatusApi } from 'src/data/apis/history/list-history/payment-status.api';
import { HistoryOrderApi } from 'src/data/apis/history/history-order.api';
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

function* historyList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<Array<models.OrderParcels>> =
      yield call(() => {
        return HistoryOrderApi.historyList(action.payload);
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
/** === LISTENER === */
function* HistorySaga() {
  yield takeLatest(types.PAYMENT_STATUS_LIST_PROCESS, paymentStatusList);
  yield takeLatest(types.HISTORY_LIST_PROCESS, historyList);
}

export default HistorySaga;
