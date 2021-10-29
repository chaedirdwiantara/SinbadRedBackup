/** === IMPORT INTERNAL === */
import * as models from '@models';
import {
  productListInitialState,
  ProductListInitialProps,
  productListReducer,
} from './product-list.reducer';
/** === TYPES === */
export type ProductInitialProps = models.ProductListProps;

interface ProductState {
  list: ProductListInitialProps;
}
/** === INITIAL STATE === */
export const productInitialState = {
  list: productListInitialState,
};
/** === REDUCER === */
export const productReducer = ({ list }: ProductState, action: any) => ({
  list: productListReducer(list, action),
});
