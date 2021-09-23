import { all, fork } from 'redux-saga/effects';
import ExampleSaga from './example.saga';
import ExampleSaga2 from './example2.saga';
import ProductSaga from './product.saga';
import AuthSaga from './auth.saga';
import UserSaga from './user.saga';
import MerchantSaga from './merchant.saga';
import OmsSaga from './oms.saga';

function* rootSaga() {
  yield all([fork(ExampleSaga)]);
  yield all([fork(ExampleSaga2)]);
  yield all([fork(ProductSaga)]);
  yield all([fork(AuthSaga)]);
  yield all([fork(UserSaga)]);
  yield all([fork(MerchantSaga)]);
  yield all([fork(OmsSaga)]);
}

export default rootSaga;
