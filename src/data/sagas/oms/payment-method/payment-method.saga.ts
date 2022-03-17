/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
import { PaymentMethodListApi } from 'src/data/apis/oms/payment-method/payment-method.api';

function* paymentMethodList(
  action: models.ListProcessAction<
    models.ListProcessProps<models.PaymentMethodProps>
  >,
) {
  try {
    const response: models.ListSuccessProps<models.PaymentMethodList[]> =
      yield call(() => {
        return PaymentMethodListApi.paymentMethodListApi(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.paymentMethodListSuccess(response),
    );

    yield put(ActionCreators.paymentMethodListSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.paymentMethodListFailed(error));
    yield put(ActionCreators.paymentMethodListFailed(error));
  }
}

function* paymentMethodGetWaitingPaymentOrder(
  action: models.ListProcessAction,
) {
  try {
    const response: models.ListSuccessProps<models.PaymentMethodGetWaitingPaymentOrder> =
      yield call(() => {
        return PaymentMethodListApi.paymentMethodGetWaitingPaymentOrderApi(
          action.payload,
        );
      });
    yield action.contextDispatch(
      ActionCreators.paymentMethodGetWaitingPaymentOrderSuccess(response),
    );

    yield put(
      ActionCreators.paymentMethodGetWaitingPaymentOrderSuccess(response),
    );
  } catch (error: any) {
    yield action.contextDispatch(
      ActionCreators.paymentMethodGetWaitingPaymentOrderFailed(error),
    );
    yield put(ActionCreators.paymentMethodGetWaitingPaymentOrderFailed(error));
  }
}

function* paymentMethodCreateOrder(
  action: models.CreateProcessAction<models.PaymentMethodCreateOrderData>,
) {
  try {
    const response: models.CreateSuccessV3Props<models.PaymentMethodCreateOrderResponse> =
      yield call(() => {
        return PaymentMethodListApi.paymentMethodCreateOrdertApi(
          action.payload,
        );
      });
    yield action.contextDispatch(
      ActionCreators.postPaymentMethodCreateOrderSuccess(response),
    );

    yield put(ActionCreators.postPaymentMethodCreateOrderSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.postPaymentMethodCreateOrderFailed(
        error as models.ErrorProps,
      ),
    );
    yield put(
      ActionCreators.postPaymentMethodCreateOrderFailed(
        error as models.ErrorProps,
      ),
    );
  }
}

function* paymentMethodSubRtdb(action: models.isOrderRTDBChangeAction) {
  try {
    const response: models.CreateSuccessV3Props<models.PaymentMethodCreateOrderResponse> =
      yield call(() => {
        return PaymentMethodListApi.useCheckDataOrder(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.isOrderRTDBChangeSuccess(response),
    );

    yield put(ActionCreators.isOrderRTDBChangeSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.isOrderRTDBChangeFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.isOrderRTDBChangeFailed(error as models.ErrorProps),
    );
  }
}

/** === LISTEN FUNCTION === */
function* paymentMethodListSaga() {
  yield takeLatest(types.PAYMENT_METHOD_LIST_PROCESS, paymentMethodList);
  yield takeLatest(
    types.PAYMENT_METHOD_GET_WAITING_PAYMENT_ORDER_PROCESS,
    paymentMethodGetWaitingPaymentOrder,
  );
  yield takeLatest(types.POST_CREATE_ORDER_PROCESS, paymentMethodCreateOrder);
  yield takeLatest(types.PAYMENT_METHOD_SUB_RTDB_PROCESS, paymentMethodSubRtdb);
}

export default paymentMethodListSaga;
