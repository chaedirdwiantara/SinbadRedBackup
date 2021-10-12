import { all, fork } from 'redux-saga/effects';
import ProductSaga from './product.saga';
import AuthSaga from './auth.saga';
import OmsSaga from './oms.saga';
import CategorySaga from './category/category.saga';
import GlobalSaga from './global/global.saga';

function* rootSaga() {
  yield all([fork(ProductSaga)]);
  yield all([fork(AuthSaga)]);
  yield all([fork(OmsSaga)]);
  yield all([fork(CategorySaga)]);
  yield all([fork(GlobalSaga)]);
}

export default rootSaga;
