/** === IMPORT ALL PROVIDER and ALL CONTEXT HERE === */
import { GlobalProvider, GlobalContext } from './global/GlobalProvider';
import { ProductProvider, ProductContext } from './product/ProductProvider';
import { TagProvider, TagContext } from './product/tag/TagProvider';
import {
  VerificationOrderProvider,
  VerificationOrderContext,
} from './oms/verification-order/VerificationOrderProvider';
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
import {
  ShopingCartProvider,
  ShopingCartContext,
} from './oms/shoping-cart/ShopingCartProvider';
import { PaymentProvider, PaymentContext } from './oms/payment/PaymentProvider';
import { SupplierProvider, SupplierContext } from './supplier/SupplierProvider';
import {
  ReserveStockProvider,
  ReserveStockContext,
} from './product/reserve-stock/ReserveStockProvider';
import {
  CheckoutProvider,
  CheckoutContext,
} from './oms/checkout/CheckoutProvider';
import { HistoryProvider, HistoryContext } from './history/HistoryProvider';
import { StockProvider, StockContext } from './product/stock/StockProvider';
/** === EXPORT ALL PROVIDER HERE === */
export const providers = [
  GlobalProvider,
  ProductProvider,
  UserProvider,
  MerchantProvider,
  VerificationOrderProvider,
  CategoryProvider,
  VoucherProvider,
  PromoProvider,
  BrandProvider,
  UserProvider,
  MerchantProvider,
  NotificationProvider,
  TagProvider,
  BannerProvider,
  ShopingCartProvider,
  PaymentProvider,
  SupplierProvider,
  ReserveStockProvider,
  CheckoutProvider,
  HistoryProvider,
  StockProvider,
];
/** === EXPORT ALL CONTEXT HERE === */
export const contexts = {
  GlobalContext,
  ProductContext,
  VerificationOrderContext,
  CategoryContext,
  UserContext,
  MerchantContext,
  VoucherContext,
  PromoContext,
  BrandContext,
  NotificationContext,
  TagContext,
  BannerContext,
  ShopingCartContext,
  PaymentContext,
  SupplierContext,
  ReserveStockContext,
  CheckoutContext,
  HistoryContext,
  StockContext,
};
