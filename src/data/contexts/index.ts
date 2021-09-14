/** === IMPORT ALL PROVIDER and ALL CONTEXT HERE === */
import { ProductProvider, ProductContext } from './products/ProductProvider';
import { ExampleProvider, ExampleContext } from './examples/ExampleProvider';
import {
  Example2Provider,
  Example2Context,
} from './examples2/Example2Provider';
import { UserProvider, UserContext } from './users/UserProvider';
/** === EXPORT ALL PROVIDER HERE === */
export const providers = [
  ProductProvider,
  ExampleProvider,
  Example2Provider,
  UserProvider,
];
/** === EXPORT ALL CONTEXT HERE === */
export const contexts = {
  ProductContext,
  ExampleContext,
  Example2Context,
  UserContext,
};
