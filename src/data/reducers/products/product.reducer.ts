/** === IMPORT HERE === */
import * as models from '@models';
import {
  productListReducer,
  productListInitialState,
} from './product-list.reducer';
/** === TYPE HERE === */
export type ProductInitialProps = models.ListProps<models.ProductList[]>;
/** === INITIAL HERE === */
export const productInitialState = {
  list: productListInitialState,
};
/** === EXPORT ALL HERE === */
export const productReducer = ({ list }: any, action: any) => ({
  list: productListReducer(list, action),
});
