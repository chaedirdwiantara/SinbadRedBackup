/** === IMPORT PACKAGES === */
import { put, call, takeLatest } from 'redux-saga/effects';
/** === IMPORT INTERNAL === */
import { ProductApi } from 'src/data/apis/product/product.api';
import * as ActionCreators from '@actions';
import * as models from '@models';
import * as types from '@types';
/** === FUNCTIONS === */
/** => List */
function* productList(action: models.ListProcessAction) {
  try {
    const response: models.ListSuccessProps<models.ProductList[]> = yield call(
      () => {
        return ProductApi.getList(
          action.payload as models.ProductListProcessProps,
        );
      },
    );
    yield action.contextDispatch(ActionCreators.productListSuccess(response));
    yield put(ActionCreators.productListSuccess(response));
  } catch (error) {
    yield action.contextDispatch(
      ActionCreators.productListFailed(error as models.ErrorProps),
    );
    yield put(ActionCreators.productListFailed(error as models.ErrorProps));
  }
}
/** === LISTENER === */
function* ProductSaga() {
  yield takeLatest(types.PRODUCT_LIST_PROCESS, productList);
}

export default ProductSaga;
