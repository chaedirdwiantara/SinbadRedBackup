/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { CartApi } from '../../../apis/oms/cart.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** => CART EXAMPLE */
function* cartExample(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.CartExample> = yield call(
      () => {
        return CartApi.exampleCart();
      },
    );
    yield action.contextDispatch(ActionCreators.cartExampleSuccess(response));
    yield put(ActionCreators.cartExampleSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.cartExampleFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.cartExampleFailed(error as models.ErrorProps));
  }
}
/** => GET CART */
function* getCart(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.GetCart> = yield call(
      () => {
        return CartApi.getCart();
      },
    );
    yield action.contextDispatch(ActionCreators.getCartSuccess(response));
    yield put(ActionCreators.getCartSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.getCartFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.getCartFailed(error as models.ErrorProps));
  }
}
/** === LISTENER === */
function* CartSaga() {
  yield takeLatest(types.CART_EXAMPLE_PROCESS, cartExample);
  yield takeLatest(types.GET_CART_PROCESS, getCart);
}

export default CartSaga;
