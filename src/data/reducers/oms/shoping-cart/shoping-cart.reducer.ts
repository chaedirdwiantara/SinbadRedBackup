/** === IMPORT INTERNAL === */
import {
  cartViewInitialState,
  CartViewInitialProps,
  cartViewReducer,
} from './shoping-cart-view.reducer';
import {
  addToCartInitialState,
  AddToCartInitialProps,
  addToCartReducer,
} from './add-to-cart.reducer';
import {
  cartUpdateInitialState,
  CartUpdateInitialProps,
  cartUpdateReducer,
} from './shoping-cart-update.reducer';
export interface ShopingCartState {
  cart: CartViewInitialProps;
  create: AddToCartInitialProps;
  update: CartUpdateInitialProps;
}
/** === INITIAL STATE === */
export const shopingCartInitialState = {
  cart: cartViewInitialState,
  create: addToCartInitialState,
  update: cartUpdateInitialState,
};
/** === REDUCER === */
export const shopingCartReducer = (
  { cart, create, update }: ShopingCartState,
  action: any,
) => ({
  cart: cartViewReducer(cart, action),
  create: addToCartReducer(create, action),
  update: cartUpdateReducer(update, action),
});
