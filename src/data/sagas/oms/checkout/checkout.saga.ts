/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { CheckoutApi } from '../../../apis/oms/checkout.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** => CHECKOUT */
function* checkout(action: models.CreateProcessAction<models.CheckoutPayload>) {
  try {
    const response: models.CreateSuccessV3Props<models.CheckoutResponse> =
      yield call(() => {
        return CheckoutApi.checkoutCart(action.payload);
      });
    yield action.contextDispatch(ActionCreators.checkoutSuccess(response));
    yield put(ActionCreators.checkoutSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.checkoutFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.checkoutFailed(error as models.ErrorProps));
  }
}
/** === LISTENER === */
function* CheckoutSaga() {
  yield takeLatest(types.CHECKOUT_PROCESS, checkout);
}

export default CheckoutSaga;
