/** === IMPORT PACKAGE HERE === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { ProductApi } from '../apis/product.api';
import * as ActionCreators from '@actions';
import * as types from '@types';
import * as models from '@models';
/** === FUNCTION === */
/** => list */
function* productList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.ProductList[]> = yield call(
      () => {
        return ProductApi.productList(action.payload);
      },
    );
    yield action.contextDispatch(ActionCreators.productListSuccess(response));
    yield put(ActionCreators.productListSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.productListFailed(error));
    yield put(ActionCreators.productListFailed(error));
  }
}
/** => product detail */
function* productDetail(action: models.DetailProcessAction) {
  try {
    const response: models.DetailSuccessProps<models.ProductDetailSuccessProps> =
      yield call(() => {
        return ProductApi.productDetail(action.payload);
      });
    yield action.contextDispatch(ActionCreators.productDetailSuccess(response));
    yield put(ActionCreators.productDetailSuccess(response));
  } catch (error: any) {
    yield action.contextDispatch(ActionCreators.productDetailFailed(error));
    yield put(ActionCreators.productDetailFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* ProductSaga() {
  yield takeLatest(types.PRODUCT_LIST_PROCESS, productList);
  yield takeLatest(types.PRODUCT_DETAIL_PROCESS, productDetail);
}

export default ProductSaga;
