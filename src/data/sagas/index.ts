import { all, fork } from 'redux-saga/effects';
import ExampleSaga from './example.saga';
import ExampleSaga2 from './example2.saga';
import ProductSaga from './product.saga';
import AuthSaga from './auth.saga';
import VerificationOrderSaga from './oms/verification-order/verification-order.saga';
import VoucherCartSaga from './voucher/voucher-cart/voucher-cart.saga';
import VoucherSaga from './voucher/voucher/voucher.saga';

function* rootSaga() {
  yield all([fork(ExampleSaga)]);
  yield all([fork(ExampleSaga2)]);
  yield all([fork(ProductSaga)]);
  yield all([fork(AuthSaga)]);
  yield all([fork(VerificationOrderSaga)]);
  yield all([fork(VoucherCartSaga)]);
  yield all([fork(VoucherSaga)]);
}

export default rootSaga;
