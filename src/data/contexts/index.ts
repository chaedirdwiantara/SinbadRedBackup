/** === IMPORT ALL PROVIDER and ALL CONTEXT HERE === */
import { GlobalProvider, GlobalContext } from './global/GlobalProvider';
import { ProductProvider, ProductContext } from './product/ProductProvider';
import { TagProvider, TagContext } from './product/tag/TagProvider';
import { CategoryProvider, CategoryContext } from './category/CategoryProvider';
import { UserProvider, UserContext } from './users/UserProvider';
import { MerchantProvider, MerchantContext } from './merchant/MerchantProvider';
import { VoucherProvider, VoucherContext } from './voucher/VoucherProvider';
import { PromoProvider, PromoContext } from './promo/PromoProvider';
import { BrandProvider, BrandContext } from './brand/BrandProvider';
import {
  NotificationProvider,
  NotificationContext,
} from './notification/NotificationProvider';
import { BannerProvider, BannerContext } from './banner/BannerProvider';

import { HistoryProvider, HistoryContext } from './history/HistoryProvider';
import { SupplierProvider, SupplierContext } from './supplier/SupplierProvider';
import {
  ReserveStockProvider,
  ReserveStockContext,
} from './product/reserve-stock/ReserveStockProvider';
import { StockProvider, StockContext } from './product/stock/StockProvider';
import { QuestProvider, QuestContext } from './quest/QuestProvider';
import { CartProvider, CartContext } from './oms/cart/CartProvider';
import {
  CheckoutProvider,
  CheckoutContext,
} from './oms/checkout/CheckoutProvider';
import {
  ThankYouPageContext,
  ThankYouPageProvider,
} from './oms/thank-you-page/ThankYouPageProvider';
import {
  OrderHistoryContext,
  OrderHistoryProvider,
} from './order-history/OrderHistoryProvider';
import {
  PaymentMethodProvider,
  PaymentMethodContext,
} from './oms/payment-method/PaymentMethodProvider';
/** === EXPORT ALL PROVIDER HERE === */
export const providers = [
  GlobalProvider,
  ProductProvider,
  UserProvider,
  MerchantProvider,
  CategoryProvider,
  VoucherProvider,
  PromoProvider,
  BrandProvider,
  UserProvider,
  MerchantProvider,
  NotificationProvider,
  TagProvider,
  BannerProvider,
  HistoryProvider,
  SupplierProvider,
  ReserveStockProvider,
  StockProvider,
  QuestProvider,
  CartProvider,
  CheckoutProvider,
  ThankYouPageProvider,
  OrderHistoryProvider,
  PaymentMethodProvider,
];
/** === EXPORT ALL CONTEXT HERE === */
export const contexts = {
  GlobalContext,
  ProductContext,
  CategoryContext,
  UserContext,
  MerchantContext,
  VoucherContext,
  PromoContext,
  BrandContext,
  NotificationContext,
  TagContext,
  BannerContext,
  HistoryContext,
  SupplierContext,
  ReserveStockContext,
  StockContext,
  QuestContext,
  CartContext,
  CheckoutContext,
  ThankYouPageContext,
  OrderHistoryContext,
  PaymentMethodContext,
};
