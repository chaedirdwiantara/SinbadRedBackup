/** === IMPORT ALL PROVIDER and ALL CONTEXT HERE === */
import { ProductProvider, ProductContext } from './products/ProductProvider';
import { OmsProvider, OmsContext } from './oms/OmsProvider';
import { ExampleProvider, ExampleContext } from './examples/ExampleProvider';
import {
  Example2Provider,
  Example2Context,
} from './examples2/Example2Provider';
import { UserProvider, UserContext } from './users/UserProvider';
import { MerchantProvider, MerchantContext } from './merchant/MerchantProvider';
/** === EXPORT ALL PROVIDER HERE === */
export const providers = [
  ProductProvider,
  ExampleProvider,
  Example2Provider,
  UserProvider,
  MerchantProvider,
  OmsProvider,
];
/** === EXPORT ALL CONTEXT HERE === */
export const contexts = {
  ProductContext,
  OmsContext,
  ExampleContext,
  Example2Context,
  UserContext,
  MerchantContext,
};
