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
import { BrandProvider, BrandContext } from './brand/BrandProvider';
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
<<<<<<< HEAD
  BrandProvider,
=======
  UserProvider,
  MerchantProvider,
>>>>>>> 1d0fabf6c7781738c513d0e502e16bb3874fa1c1
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
};
