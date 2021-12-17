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
import {
  productDetailCartInitialState,
  productDetailCartReducer,
  ProductDetailCartInitialProps,
} from './detail/product-detail-cart.reducer';
/** === TYPES === */
export interface ProductState {
  list: ProductListInitialProps;
  detail: ProductDetailInitialProps;
  cart: ProductDetailCartInitialProps;
}
/** === INITIAL STATE === */
export const productInitialState = {
  list: productListInitialState,
  detail: productDetailInitialState,
  cart: productDetailCartInitialState,
};
/** === REDUCER === */
export const productReducer = (
  { list, detail, cart }: ProductState,
  action: any,
) => ({
  list: productListReducer(list, action),
  detail: productDetailReducer(detail, action),
  cart: productDetailCartReducer(cart, action),
});
