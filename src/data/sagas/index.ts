import { all, fork } from 'redux-saga/effects';
import ExampleSaga from './example.saga';
import ExampleSaga2 from './example2.saga';
import ProductSaga from './product.saga';
import AuthSaga from './auth.saga';
import UserSaga from './user.saga';
import MerchantSaga from './merchant.saga';
// import OmsSaga from './oms.saga';
import RegisterSaga from './register.saga';
import GlobalSaga from './global.saga';
import VerificationOrderSaga from './oms/verification-order/verification-order.saga';
import CategorySaga from './category/category.saga';
import PromoSaga from './promo.saga';
import VoucherSaga from './voucher.saga';

function* rootSaga() {
  yield all([fork(ExampleSaga)]);
  yield all([fork(ExampleSaga2)]);
  yield all([fork(ProductSaga)]);
  yield all([fork(AuthSaga)]);
  yield all([fork(UserSaga)]);
  yield all([fork(MerchantSaga)]);
  // yield all([fork(OmsSaga)]);
  yield all([fork(GlobalSaga)]);
  yield all([fork(RegisterSaga)]);
  yield all([fork(VerificationOrderSaga)]);
  yield all([fork(VoucherSaga)]);
  yield all([fork(CategorySaga)]);
  yield all([fork(PromoSaga)]);
}

export default rootSaga;
