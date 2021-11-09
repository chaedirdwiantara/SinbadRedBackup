import { all, fork } from 'redux-saga/effects';
import ProductSaga from './product/product.saga';
import ProductTagSaga from './product/tag.saga';
import AuthSaga from './auth.saga';
import UserSaga from './user.saga';
import MerchantSaga from './merchant.saga';
import RegisterSaga from './register.saga';
import VerificationOrderSaga from './oms/verification-order/verification-order.saga';
import CategorySaga from './category/category.saga';
import GlobalSaga from './global/global.saga';
import PromoSaga from './promo.saga';
import VoucherSaga from './voucher.saga';
import BrandSaga from './brand.saga';
import NotificationSaga from './notification.saga';
import BannerSaga from './banner.saga';

function* rootSaga() {
  yield all([fork(ProductSaga)]);
  yield all([fork(AuthSaga)]);
  yield all([fork(UserSaga)]);
  yield all([fork(MerchantSaga)]);
  yield all([fork(GlobalSaga)]);
  yield all([fork(RegisterSaga)]);
  yield all([fork(VerificationOrderSaga)]);
  yield all([fork(VoucherSaga)]);
  yield all([fork(CategorySaga)]);
  yield all([fork(GlobalSaga)]);
  yield all([fork(PromoSaga)]);
  yield all([fork(BrandSaga)]);
  yield all([fork(NotificationSaga)]);
  yield all([fork(ProductTagSaga)]);
  yield all([fork(BannerSaga)]);
}

export default rootSaga;
