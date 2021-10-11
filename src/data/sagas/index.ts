import { all, fork } from 'redux-saga/effects';
import ProductSaga from './product.saga';
import AuthSaga from './auth.saga';
import OmsSaga from './oms.saga';
import CategorySaga from './category/category.saga';

function* rootSaga() {
  yield all([fork(ProductSaga)]);
  yield all([fork(AuthSaga)]);
  yield all([fork(OmsSaga)]);
  yield all([fork(CategorySaga)]);
}

export default rootSaga;
