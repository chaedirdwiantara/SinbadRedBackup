/** === IMPORT ALL PROVIDER and ALL CONTEXT HERE === */
import { ProductProvider, ProductContext } from './products/ProductProvider';
import { OmsProvider, OmsContext } from './oms/OmsProvider';
import { ExampleProvider, ExampleContext } from './examples/ExampleProvider';
import {
  Example2Provider,
  Example2Context,
} from './examples2/Example2Provider';
/** === EXPORT ALL PROVIDER HERE === */
export const providers = [
  ProductProvider,
  OmsProvider,
  ExampleProvider,
  Example2Provider,
];
/** === EXPORT ALL CONTEXT HERE === */
export const contexts = {
  ProductContext,
  OmsContext,
  ExampleContext,
  Example2Context,
};
