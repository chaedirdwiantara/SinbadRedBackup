import { all, fork } from 'redux-saga/effects';
import AuthCoreSaga from '@core/data/sagas/auth/auth.saga';
import ProductSaga from './product/product.saga';
import ProductTagSaga from './product/tag.saga';
import AuthSaga from './auth.saga';
import UserSaga from './user.saga';
import MerchantSaga from './merchant.saga';
import RegisterSaga from './register.saga';
import VerificationOrderSaga from './oms/verification-order/verification-order.saga';
import CartSaga from './oms/shoping-cart/shoping-cart.saga';
import CategorySaga from './category/category.saga';
import GlobalSaga from './global/global.saga';
import PromoSaga from './promo.saga';
import VoucherSaga from './voucher.saga';
import BrandSaga from './brand.saga';
import NotificationSaga from './notification.saga';
import BannerSaga from './banner.saga';
import SupplierSaga from './supplier/supplier.saga';
import CheckoutSaga from './oms/checkout/checkout.saga';
import PaymentSaga from './oms/payment/payment.saga';
import ProductReserveStockSaga from './product/reserve-stock.saga';
<<<<<<< HEAD
import HistoryOrderSaga from './history/order-status.saga';
import HistorySaga from './history.saga';
=======
import StockSaga from './product/stock.saga';
>>>>>>> ed78743302ea3668d09c893893a696bfd87d795a

function* rootSaga() {
  yield all([fork(AuthCoreSaga)]);
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
  yield all([fork(CartSaga)]);
  yield all([fork(SupplierSaga)]);
  yield all([fork(CheckoutSaga)]);
  yield all([fork(PaymentSaga)]);
  yield all([fork(ProductReserveStockSaga)]);
<<<<<<< HEAD
  yield all([fork(HistorySaga)]);
  yield all([fork(HistoryOrderSaga)]);
=======
  yield all([fork(StockSaga)]);
>>>>>>> ed78743302ea3668d09c893893a696bfd87d795a
}

export default rootSaga;
