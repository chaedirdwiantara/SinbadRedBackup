/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { CartApi } from 'src/data/apis/oms/shoping-cart.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** => Cart view */
function* cartView(action: Omit<models.DetailProcessAction, 'payload'>) {
  try {
    const response: models.DetailSuccessProps<models.CartSuccessProps> =
      yield call(() => {
        return CartApi.getCartView();
      });
    yield action.contextDispatch(ActionCreators.cartViewSuccess(response));
    yield put(ActionCreators.cartViewSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.cartViewFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.cartViewFailed(error as models.ErrorProps));
  }
}
/** => Add to cart */
function* addToCart(action: models.CreateProcessAction) {
  try {
    const response: models.CreateSuccessProps = yield call(() => {
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
/** => Update */
function* updateCart(action: models.UpdateProcessAction) {
  try {
    const response: models.UpdateSuccessProps = yield call(() => {
      return CartApi.updateCart(action.payload);
    });
    yield action.contextDispatch(ActionCreators.cartUpdateSuccess(response));
    yield put(ActionCreators.cartUpdateSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.cartUpdateFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.cartUpdateFailed(error as models.ErrorProps));
  }
}
/** => Cart view */
function* cartTotalProduct(
  action: Omit<models.DetailProcessAction, 'payload'>,
) {
  try {
    const response: models.DetailSuccessProps<models.CartTotalProductSuccess> =
      yield call(() => {
        return CartApi.getCartTotalProduct();
      });
    yield action.contextDispatch(
      ActionCreators.cartTotalProductSuccess(response),
    );
    yield put(ActionCreators.cartTotalProductSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.cartTotalProductFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.cartTotalProductFailed(error as models.ErrorProps),
    );
  }
}
/** === LISTENER === */
function* CartSaga() {
  yield takeLatest(types.CART_VIEW_PROCESS, cartView);
  yield takeLatest(types.ADD_TO_CART_PROCESS, addToCart);
  yield takeLatest(types.CART_UPDATE_PROCESS, updateCart);
  yield takeLatest(types.CART_TOTAL_PRODUCT_PROCESS, cartTotalProduct);
}

export default CartSaga;
