/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { CheckoutApi } from 'src/data/apis/oms/checkout.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** => get checkout */
function* getCheckout(action: Omit<models.DetailProcessAction, 'payload'>) {
  try {
    const response: models.DetailSuccessProps<models.CheckoutSuccess> =
      yield call(() => {
        return CheckoutApi.getCheckout();
      });
    yield action.contextDispatch(ActionCreators.getCheckoutSuccess(response));
    yield put(ActionCreators.getCheckoutSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.getCheckoutFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.getCheckoutFailed(error as models.ErrorProps));
  }
}

function* createOrders(
  action: models.CreateProcessAction<models.CreateOrders>,
) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
      return CheckoutApi.createOrders(action.payload);
    });
    yield action.contextDispatch(ActionCreators.createOrdersSuccess(response));
    yield put(ActionCreators.createOrdersSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.createOrdersFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.createOrdersFailed(error as models.ErrorProps));
  }
}
/** === LISTENER === */
function* CheckoutSaga() {
  yield takeLatest(types.GET_CHECKOUT_PROCESS, getCheckout);
  yield takeLatest(types.CREATE_ORDER_PROCESS, createOrders);
}

export default CheckoutSaga;
