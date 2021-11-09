/** === IMPORT INTERNAL === */
import {
  productListInitialState,
  ProductListInitialProps,
  productListReducer,
} from './product-list.reducer';
import {
  productDetailInitialState,
  ProductDetailInitialProps,
  productDetailReducer,
} from './detail/product-detail.reducer';
/** === TYPES === */
export interface ProductState {
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
