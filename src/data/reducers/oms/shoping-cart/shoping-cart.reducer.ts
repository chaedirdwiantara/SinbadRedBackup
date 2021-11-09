/** === IMPORT INTERNAL === */
import * as models from '@models';
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
/** === TYPES === */
export type ShopingCartInitialProps = models.ShopingCartProps &
  models.CreateProps;
interface ShopingCartState {
  cart: CartViewInitialProps;
  create: AddToCartInitialProps;
}
/** === INITIAL STATE === */
export const shopingCartInitialState = {
  cart: cartViewInitialState,
  create: addToCartInitialState,
};
/** === REDUCER === */
export const shopingCartReducer = (
  { cart, create }: ShopingCartState,
  action: any,
) => ({
  cart: cartViewReducer(cart, action),
  create: addToCartReducer(create, action),
});
