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
  } catch (error) {
    yield action.contextDispatch(ActionCreators.productListFailed(error));
    yield put(ActionCreators.productListFailed(error));
  }
}
/** === LISTEN FUNCTION === */
function* ProductSaga() {
  yield takeLatest(types.PRODUCT_LIST_PROCESS, productList);
}

export default ProductSaga;
