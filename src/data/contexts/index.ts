/** === IMPORT ALL PROVIDER and ALL CONTEXT HERE === */
import { ProductProvider, ProductContext } from './products/ProductProvider';
import { OmsProvider, OmsContext } from './oms/OmsProvider';
import { CategoryProvider, CategoryContext } from './category/CategoryProvider';
/** === EXPORT ALL PROVIDER HERE === */
export const providers = [ProductProvider, OmsProvider, CategoryProvider];
/** === EXPORT ALL CONTEXT HERE === */
export const contexts = {
  ProductContext,
  OmsContext,
  CategoryContext,
};
