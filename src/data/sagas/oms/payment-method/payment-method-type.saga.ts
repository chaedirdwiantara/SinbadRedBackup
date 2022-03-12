/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
import { PaymentMethodTypeApi } from 'src/data/apis/oms/payment-method/payment-method.api';

function* paymentMethodType(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.PaymentMethodType> =
      yield call(() => {
        return PaymentMethodTypeApi.paymentMethodTypeApi(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.paymentMethodTypeSuccess(response),
    );

    yield put(ActionCreators.paymentMethodTypeSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.paymentMethodTypeFailed(error));
    yield put(ActionCreators.paymentMethodTypeFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* PaymentMethodTypeSaga() {
  yield takeLatest(types.PAYMENT_METHOD_TYPE_PROCESS, paymentMethodType);
}

export default PaymentMethodTypeSaga;
