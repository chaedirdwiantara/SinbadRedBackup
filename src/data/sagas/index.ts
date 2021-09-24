import { all, fork } from 'redux-saga/effects';
import ExampleSaga from './example.saga';
import ExampleSaga2 from './example2.saga';
import ProductSaga from './product.saga';
import AuthSaga from './auth.saga';
import RegisterSaga from './register.saga';
import GlobalSaga from './global.saga';
import VoucherSaga from './voucher.saga';
import OmsSaga from './oms.saga';

function* rootSaga() {
  yield all([fork(ExampleSaga)]);
  yield all([fork(ExampleSaga2)]);
  yield all([fork(ProductSaga)]);
  yield all([fork(AuthSaga)]);
  yield all([fork(GlobalSaga)]);
  yield all([fork(RegisterSaga)]);
  yield all([fork(VoucherSaga)]);
  yield all([fork(OmsSaga)]);
}

export default rootSaga;
