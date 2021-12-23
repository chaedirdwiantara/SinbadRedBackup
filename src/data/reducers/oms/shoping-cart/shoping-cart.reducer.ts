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
import {
  addToCartDetailInitialState,
  addToCartDetailReducer,
  AddToCartDetailInitialProps,
} from './add-to-cart-detail.reducer';
export interface ShopingCartState {
  cart: CartViewInitialProps;
  create: AddToCartInitialProps;
  update: CartUpdateInitialProps;
  add: AddToCartDetailInitialProps;
}
/** === INITIAL STATE === */
export const shopingCartInitialState = {
  cart: cartViewInitialState,
  create: addToCartInitialState,
  update: cartUpdateInitialState,
  add: addToCartDetailInitialState,
};
/** === REDUCER === */
export const shopingCartReducer = (
  { cart, create, update, add }: ShopingCartState,
  action: any,
) => ({
  cart: cartViewReducer(cart, action),
  create: addToCartReducer(create, action),
  update: cartUpdateReducer(update, action),
  add: addToCartDetailReducer(add, action),
});
