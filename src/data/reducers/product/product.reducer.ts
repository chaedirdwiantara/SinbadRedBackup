/** === IMPORT INTERNAL === */
import * as models from '@models';
import {
  productListInitialState,
  ProductListInitialProps,
  productListReducer,
} from './product-list.reducer';
import {
  productDetailInitialState,
  productDetailReducer,
  ProductDetailInitialProps,
} from './detail/product-detail.reducer';
/** === TYPES === */
export type ProductInitialProps = models.ProductListProps;

interface ProductState {
  list: ProductListInitialProps;
  detail: ProductDetailInitialProps;
}
/** === INITIAL STATE === */
export const productInitialState = {
  list: productListInitialState,
  detail: productDetailInitialState,
};
/** === REDUCER === */
export const productReducer = ({ list }: ProductState, action: any) => ({
  list: productListReducer(list, action),
  detail: productDetailReducer(list, action),
});
