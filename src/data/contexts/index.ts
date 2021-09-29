/** === IMPORT ALL PROVIDER and ALL CONTEXT HERE === */
import { ProductProvider, ProductContext } from './products/ProductProvider';
import { OmsProvider, OmsContext } from './oms/OmsProvider';
import { CategoryProvider, CategoryContext } from './category/CategoryProvider';
import { ExampleProvider, ExampleContext } from './examples/ExampleProvider';
import {
  Example2Provider,
  Example2Context,
} from './examples2/Example2Provider';
/** === EXPORT ALL PROVIDER HERE === */
export const providers = [
  ProductProvider,
  OmsProvider,
  CategoryProvider,
  ExampleProvider,
  Example2Provider,
];
/** === EXPORT ALL CONTEXT HERE === */
export const contexts = {
  ProductContext,
  OmsContext,
  CategoryContext,
  ExampleContext,
  Example2Context,
};
