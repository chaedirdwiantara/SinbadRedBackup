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
import {
  updateCartInitialState,
  updateCartReducer,
  UpdateCartInitialProps,
} from './update-cart.reducer';
import {
  CheckoutInitialProps,
  checkoutInitialState,
  checkoutReducer,
} from './checkout.reducer';
import {
  removeCartProductInitialState,
  removeCartProductReducer,
  RemoveCartProductInitialProps,
} from './remove-cart-product.reducer';

export interface CartInitialProps {
  example: CartExampleInitialProps;
  get: GetCartInitialProps;
  total: GetTotalCartInitialProps;
  create: AddToCartInitialProps;
  update: UpdateCartInitialProps;
  checkout: CheckoutInitialProps;
  remove: RemoveCartProductInitialProps;
}
/** === INITIAL STATE === */
export const cartInitialState = {
  example: cartExampleInitialState,
  get: getCartInitialState,
  total: getTotalCartInitialState,
  create: addToCartInitialState,
  update: updateCartInitialState,
  checkout: checkoutInitialState,
  remove: removeCartProductInitialState,
};
/** === REDUCER === */
export const cartReducer = (
  { example, get, total, create, update, checkout, remove }: CartInitialProps,
  action: any,
) => ({
  example: cartExampleReducer(example, action),
  get: getCartReducer(get, action),
  total: getTotalCartReducer(total, action),
  create: addToCartReducer(create, action),
  update: updateCartReducer(update, action),
  checkout: checkoutReducer(checkout, action),
  remove: removeCartProductReducer(remove, action),
});
