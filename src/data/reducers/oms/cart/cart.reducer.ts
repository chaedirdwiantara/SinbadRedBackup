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
export interface CartInitialProps {
  example: CartExampleInitialProps;
  get: GetCartInitialProps;
}
/** === INITIAL STATE === */
export const cartInitialState = {
  example: cartExampleInitialState,
  get: getCartInitialState,
};
/** === REDUCER === */
export const cartReducer = (
  { example, get }: CartInitialProps,
  action: any,
) => ({
  example: cartExampleReducer(example, action),
  get: getCartReducer(get, action),
});
