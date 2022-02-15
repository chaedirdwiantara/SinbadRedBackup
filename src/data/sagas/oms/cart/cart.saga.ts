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
/** => GET TOTAL CART */
function* getTotalCart(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.GetTotalCart> = yield call(
      () => {
        return CartApi.getTotalCart();
      },
    );
    yield action.contextDispatch(ActionCreators.getTotalCartSuccess(response));
    yield put(ActionCreators.getTotalCartSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.getTotalCartFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.getTotalCartFailed(error as models.ErrorProps));
  }
}
/** => ADD TO CART */
function* addToCart(
  action: models.CreateProcessAction<models.AddToCartPayload>,
) {
  try {
    const response: models.CreateSuccessV3Props<models.AddToCartResponse> =
      yield call(() => {
        return CartApi.addToCart(action.payload);
      });
    yield action.contextDispatch(ActionCreators.addToCartSuccess(response));
    yield put(ActionCreators.addToCartSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.addToCartFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.addToCartFailed(error as models.ErrorProps));
  }
}
/** => UPDATE CART */
function* updateCart(
  action: models.UpdateProcessAction<models.UpdateCartPayload>,
) {
  try {
    const response: models.UpdateSuccessV3Props<models.UpdateCartResponse> =
      yield call(() => {
        return CartApi.updateCart(action.payload);
      });
    yield action.contextDispatch(ActionCreators.updateCartSuccess(response));
    yield put(ActionCreators.updateCartSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.updateCartFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.updateCartFailed(error as models.ErrorProps));
  }
}
/** => CHECKOUT */
function* checkout(action: models.CreateProcessAction<models.CheckoutPayload>) {
  try {
    const response: models.CreateSuccessV3Props<models.CheckoutResponse> =
      yield call(() => {
        return CartApi.checkoutCart(action.payload);
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
function* CartSaga() {
  yield takeLatest(types.CART_EXAMPLE_PROCESS, cartExample);
  yield takeLatest(types.GET_CART_PROCESS, getCart);
  yield takeLatest(types.GET_TOTAL_CART_PROCESS, getTotalCart);
  yield takeLatest(types.ADD_TO_CART_PROCESS, addToCart);
  yield takeLatest(types.UPDATE_CART_PROCESS, updateCart);
  yield takeLatest(types.CHECKOUT_PROCESS, checkout);
}

export default CartSaga;
