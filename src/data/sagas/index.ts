import { all, fork } from 'redux-saga/effects';
import AuthCoreSaga from '@core/data/sagas/auth/auth.saga';
import ProductSaga from './product/product.saga';
import ProductTagSaga from './product/tag.saga';
import UserSaga from './user.saga';
import MerchantSaga from './merchant.saga';
import RegisterSaga from './register.saga';
import CategorySaga from './category/category.saga';
import GlobalSaga from './global/global.saga';
import PromoSaga from './promo.saga';
import VoucherSaga from './voucher.saga';
import BrandSaga from './brand.saga';
import NotificationSaga from './notification.saga';
import BannerSaga from './banner.saga';
import SupplierSaga from './supplier/supplier.saga';
import ProductReserveStockSaga from './product/reserve-stock.saga';
import HistorySaga from './history.saga';
import StockSaga from './product/stock.saga';
import QuestSaga from './quest.saga';
import CartSaga from './oms/cart/cart.saga';
import CheckoutSaga from './oms/checkout/checkout.saga';
import OrderHistorySaga from './order-history/order-history.saga';

function* rootSaga() {
  yield all([fork(AuthCoreSaga)]);
  yield all([fork(ProductSaga)]);
  yield all([fork(UserSaga)]);
  yield all([fork(MerchantSaga)]);
  yield all([fork(RegisterSaga)]);
  yield all([fork(VoucherSaga)]);
  yield all([fork(CategorySaga)]);
  yield all([fork(GlobalSaga)]);
  yield all([fork(PromoSaga)]);
  yield all([fork(BrandSaga)]);
  yield all([fork(NotificationSaga)]);
  yield all([fork(ProductTagSaga)]);
  yield all([fork(BannerSaga)]);
  yield all([fork(SupplierSaga)]);
  yield all([fork(HistorySaga)]);
  yield all([fork(ProductReserveStockSaga)]);
  yield all([fork(StockSaga)]);
  yield all([fork(QuestSaga)]);
  yield all([fork(CartSaga)]);
  yield all([fork(CheckoutSaga)]);
  yield all([fork(OrderHistorySaga)]);
}

export default rootSaga;
