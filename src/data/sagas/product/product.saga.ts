/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { ProductApi } from 'src/data/apis/product/product.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** => List */
function* productList(action: models.ProductListProcessAction) {
  try {
    const response: models.ListSuccessProps<Array<models.ProductList>> =
      yield call(() => {
        return ProductApi.getList(
          action.payload as models.ProductListProcessProps,
          action.subModule,
        );
      });
    yield action.contextDispatch(ActionCreators.productListSuccess(response));
    yield put(ActionCreators.productListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.productListFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.productListFailed(error as models.ErrorProps));
  }
}
/** => Detail */
function* productDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.ProductDetail> =
      yield call(() => {
        return ProductApi.getDetail(action.payload);
      });
    yield action.contextDispatch(ActionCreators.productDetailSuccess(response));
    yield put(ActionCreators.productDetailSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.productDetailFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.productDetailFailed(error as models.ErrorProps));
  }
}
/** => Cart */
function* productDetailCart(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.ProductDetail> =
      yield call(() => {
        return ProductApi.getDetail(action.payload);
      });
    yield action.contextDispatch(
      ActionCreators.productDetailCartSuccess(response),
    );
    yield put(ActionCreators.productDetailCartSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.productDetailCartFailed(error as models.ErrorProps),
    );
    yield put(
      ActionCreators.productDetailCartFailed(error as models.ErrorProps),
    );
  }
}
/** === LISTENER === */
function* ProductSaga() {
  yield takeLatest(types.PRODUCT_LIST_PROCESS, productList);
  yield takeLatest(types.PRODUCT_DETAIL_PROCESS, productDetail);
  yield takeLatest(types.PRODUCT_DETAIL_CART_PROCESS, productDetailCart);
}

export default ProductSaga;
