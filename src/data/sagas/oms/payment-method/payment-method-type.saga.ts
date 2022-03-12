/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
import { PaymentMethodListApi } from 'src/data/apis/oms/payment-method/payment-method.api';

function* paymentMethodList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.PaymentMethodList> =
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
/** === LISTEN FUNCTION === */
function* paymentMethodListSaga() {
  yield takeLatest(types.PAYMENT_METHOD_LIST_PROCESS, paymentMethodList);
}

export default paymentMethodListSaga;
