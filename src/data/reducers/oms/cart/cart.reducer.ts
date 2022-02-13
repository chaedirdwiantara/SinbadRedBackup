/** === IMPORT INTERNAL === */
import {
  cartExampleInitialState,
  cartExampleReducer,
  CartExampleInitialProps,
} from './example-cart.reducer';
import {
  getCartInitialState,
  getCartReducer,
  GetCartInitialProps,
} from './get-cart.reducer';
import {
  GetTotalCartInitialProps,
  getTotalCartInitialState,
  getTotalCartReducer,
} from './total-cart.reducer';
import {
  addToCartInitialState,
  addToCartReducer,
  AddToCartInitialProps,
} from './add-to-cart.reducer';
export interface CartInitialProps {
  example: CartExampleInitialProps;
  get: GetCartInitialProps;
  total: GetTotalCartInitialProps;
  create: AddToCartInitialProps;
}
/** === INITIAL STATE === */
export const cartInitialState = {
  example: cartExampleInitialState,
  get: getCartInitialState,
  total: getTotalCartInitialState,
  create: addToCartInitialState,
};
/** === REDUCER === */
export const cartReducer = (
  { example, get, total, create }: CartInitialProps,
  action: any,
) => ({
  example: cartExampleReducer(example, action),
  get: getCartReducer(get, action),
  total: getTotalCartReducer(total, action),
  create: addToCartReducer(create, action),
});
