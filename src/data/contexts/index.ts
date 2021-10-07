/** === IMPORT ALL PROVIDER and ALL CONTEXT HERE === */
import { ProductProvider, ProductContext } from './products/ProductProvider';
import {
  VerificationOrderProvider,
  VerificationOrderContext,
} from './oms/verification-order/VerificationOrderProvider';
import { CategoryProvider, CategoryContext } from './category/CategoryProvider';
import { ExampleProvider, ExampleContext } from './examples/ExampleProvider';
import {
  Example2Provider,
  Example2Context,
} from './examples2/Example2Provider';
import { VoucherProvider, VoucherContext } from './voucher/VoucherProvider';
import { PromoProvider, PromoContext } from './promo/PromoProvider';
/** === EXPORT ALL PROVIDER HERE === */
export const providers = [
  ProductProvider,
  VerificationOrderProvider,
  ExampleProvider,
  Example2Provider,
  CategoryProvider,
  ExampleProvider,
  Example2Provider,
  VoucherProvider,
  PromoProvider,
];
/** === EXPORT ALL CONTEXT HERE === */
export const contexts = {
  ProductContext,
  VerificationOrderContext,
  CategoryContext,
  ExampleContext,
  Example2Context,
  VoucherContext,
  PromoContext,
};
