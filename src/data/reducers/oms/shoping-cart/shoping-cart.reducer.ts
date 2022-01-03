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
import {
  CartCheckedoutInitialProps,
  cartCheckedoutInitialState,
  cartCheckedoutReducer,
} from './cart-checkedout.reducer';
import {
  initialCartUpdateInitialState,
  initialCartUpdateReducer,
  InitialCartUpdateInitialProps,
} from './initial-shopping-cart-update.reducer';
export interface ShopingCartState {
  cart: CartViewInitialProps;
  create: AddToCartInitialProps;
  update: CartUpdateInitialProps;
  add: AddToCartDetailInitialProps;
  checkedout: CartCheckedoutInitialProps;
  initialUpdate: InitialCartUpdateInitialProps;
}
/** === INITIAL STATE === */
export const shopingCartInitialState = {
  cart: cartViewInitialState,
  create: addToCartInitialState,
  update: cartUpdateInitialState,
  add: addToCartDetailInitialState,
  checkedout: cartCheckedoutInitialState,
  initialUpdate: initialCartUpdateInitialState,
};
/** === REDUCER === */
export const shopingCartReducer = (
  { cart, create, update, add, checkedout, initialUpdate }: ShopingCartState,
  action: any,
) => ({
  cart: cartViewReducer(cart, action),
  create: addToCartReducer(create, action),
  update: cartUpdateReducer(update, action),
  add: addToCartDetailReducer(add, action),
  checkedout: cartCheckedoutReducer(checkedout, action),
  initialUpdate: initialCartUpdateReducer(initialUpdate, action),
});
