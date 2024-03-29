/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { CartApi } from '../../../apis/oms/cart.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** => GET CART */
function* getCart(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.GetCartData> = yield call(
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
/** => REMOVE CART PRODUCT */
function* removeCartProduct(
  action: models.UpdateProcessAction<models.RemoveCartProductPayload>,
) {
  try {
    const response: models.UpdateSuccessV3Props<models.RemoveCartProductResponse> =
      yield call(() => {
        return CartApi.removeCartProduct(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.removeCartProductSuccess(response),
    );
    yield put(ActionCreators.removeCartProductSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.removeCartProductFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.removeCartProductFailed(error as models.ErrorProps),
    );
  }
}
/** => CHECK PRODUCT */
function* checkProduct(
  action: models.CreateProcessAction<models.CheckProductPayload>,
) {
  try {
    const response: models.CreateSuccessV3Props<models.CheckProductResponse[]> =
      yield call(() => {
        return CartApi.checkProduct(action.payload);
      });
    yield action.contextDispatch(ActionCreators.checkProductSuccess(response));
    yield put(ActionCreators.checkProductSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.checkProductFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.checkProductFailed(error as models.ErrorProps));
  }
}
/** => POST CHECK PRODUCT */
function* postCheckProduct(
  action: models.CreateProcessAction<models.CheckProductPayload>,
) {
  try {
    const response: models.CreateSuccessV3Props<models.CheckProductResponse[]> =
      yield call(() => {
        return CartApi.checkProduct(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.postCheckProductSuccess(response),
    );
    yield put(ActionCreators.postCheckProductSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.postCheckProductFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.postCheckProductFailed(error as models.ErrorProps),
    );
  }
}
/** => CHECK SELLER */
function* checkSeller(
  action: models.CreateProcessAction<models.CheckSellerPayload>,
) {
  try {
    const response: models.CreateSuccessV3Props<models.CheckSellerResponse[]> =
      yield call(() => {
        return CartApi.checkSeller(action.payload);
      });
    yield action.contextDispatch(ActionCreators.checkSellerSuccess(response));
    yield put(ActionCreators.checkSellerSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.checkSellerFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.checkSellerFailed(error as models.ErrorProps));
  }
}
/** => POST CHECK SELLER */
function* postCheckSeller(
  action: models.CreateProcessAction<models.CheckSellerPayload>,
) {
  try {
    const response: models.CreateSuccessV3Props<models.CheckSellerResponse[]> =
      yield call(() => {
        return CartApi.checkSeller(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.postCheckSellerSuccess(response),
    );
    yield put(ActionCreators.postCheckSellerSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.postCheckSellerFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.postCheckSellerFailed(error as models.ErrorProps));
  }
}
/** => CHECK STOCK */
function* checkStock(
  action: models.CreateProcessAction<models.CheckStockPayload>,
) {
  try {
    const response: models.CreateSuccessV3Props<models.CheckStockResponse[]> =
      yield call(() => {
        return CartApi.checkStock(action.payload);
      });
    yield action.contextDispatch(ActionCreators.checkStockSuccess(response));
    yield put(ActionCreators.checkStockSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.checkStockFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.checkStockFailed(error as models.ErrorProps));
  }
}
/** => POST CHECK STOCK */
function* postCheckStock(
  action: models.CreateProcessAction<models.CheckStockPayload>,
) {
  try {
    const response: models.CreateSuccessV3Props<models.CheckStockResponse[]> =
      yield call(() => {
        return CartApi.checkStock(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.postCheckStockSuccess(response),
    );
    yield put(ActionCreators.postCheckStockSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.postCheckStockFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.postCheckStockFailed(error as models.ErrorProps));
  }
}
/** => CANCEL STOCK */
function* cancelStock(action: Omit<models.DeleteProcessAction, 'id'>) {
  try {
    const response: models.DeleteSuccessV3Props = yield call(() => {
      return CartApi.cancelStock();
    });
    yield action.contextDispatch(ActionCreators.cancelStockSuccess(response));
    yield put(ActionCreators.cancelStockSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.cancelStockFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.cancelStockFailed(error as models.ErrorProps));
  }
}
/** => CHECK BUYER */
function* checkBuyer(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.CheckBuyer> = yield call(
      () => {
        return CartApi.checkBuyer();
      },
    );
    yield action.contextDispatch(ActionCreators.checkBuyerSuccess(response));
    yield put(ActionCreators.checkBuyerSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.checkBuyerFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.checkBuyerFailed(error as models.ErrorProps));
  }
}
/** === LISTENER === */
function* CartSaga() {
  yield takeLatest(types.GET_CART_PROCESS, getCart);
  yield takeLatest(types.GET_TOTAL_CART_PROCESS, getTotalCart);
  yield takeLatest(types.ADD_TO_CART_PROCESS, addToCart);
  yield takeLatest(types.UPDATE_CART_PROCESS, updateCart);
  yield takeLatest(types.REMOVE_CART_PRODUCT_PROCESS, removeCartProduct);
  yield takeLatest(types.CHECK_PRODUCT_PROCESS, checkProduct);
  yield takeLatest(types.POST_CHECK_PRODUCT_PROCESS, postCheckProduct);
  yield takeLatest(types.CHECK_SELLER_PROCESS, checkSeller);
  yield takeLatest(types.POST_CHECK_SELLER_PROCESS, postCheckSeller);
  yield takeLatest(types.CHECK_STOCK_PROCESS, checkStock);
  yield takeLatest(types.POST_CHECK_STOCK_PROCESS, postCheckStock);
  yield takeLatest(types.CANCEL_STOCK_PROCESS, cancelStock);
  yield takeLatest(types.CHECK_BUYER_PROCESS, checkBuyer);
}

export default CartSaga;
