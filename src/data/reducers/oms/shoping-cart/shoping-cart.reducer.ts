/** === IMPORT INTERNAL === */
import * as models from '@models';
import {
  cartViewInitialState,
  CartViewInitialProps,
  cartViewReducer,
} from './shoping-cart-view.reducer';
/** === TYPES === */
export type ShopingCartInitialProps = models.ShopingCartProps;

interface ShopingCartState {
  cart: CartViewInitialProps;
}
/** INITIAL STATE */
export const shopingCartInitialState = {
  cart: cartViewInitialState,
};
/** === REDUCER === */
export const shopingCartReducer = (
  { cart }: ShopingCartState,
  action: any,
) => ({
  cart: cartViewReducer(cart, action),
});
