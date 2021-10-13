/** === IMPORT ALL PROVIDER and ALL CONTEXT HERE === */
import { GlobalProvider, GlobalContext } from './global/GlobalProvider';
import { ProductProvider, ProductContext } from './products/ProductProvider';
import {
  VerificationOrderProvider,
  VerificationOrderContext,
} from './oms/verification-order/VerificationOrderProvider';
import { CategoryProvider, CategoryContext } from './category/CategoryProvider';
import { UserProvider, UserContext } from './users/UserProvider';
import { MerchantProvider, MerchantContext } from './merchant/MerchantProvider';
import { VoucherProvider, VoucherContext } from './voucher/VoucherProvider';
import { PromoProvider, PromoContext } from './promo/PromoProvider';
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
  UserProvider,
  MerchantProvider,
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
};
