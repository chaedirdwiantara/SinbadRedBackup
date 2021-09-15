import { all, fork } from 'redux-saga/effects';
import ExampleSaga from './example.saga';
import ExampleSaga2 from './example2.saga';
import ProductSaga from './product.saga';
import AuthSaga from './auth.saga';

function* rootSaga() {
  yield all([fork(ExampleSaga)]);
  yield all([fork(ExampleSaga2)]);
  yield all([fork(ProductSaga)]);
  yield all([fork(AuthSaga)]);
}

export default rootSaga;
