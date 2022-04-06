import {
  CheckoutCartInitialProps,
  checkoutCartInitialState,
  checkoutCartReducer,
} from './checkout-cart.reducer';

export interface CheckoutInitialProps {
  checkout: CheckoutCartInitialProps;
}
/** === INITIAL STATE === */
export const checkoutInitialState = {
  checkout: checkoutCartInitialState,
};
/** === REDUCER === */
export const checkoutReducer = (
  { checkout }: CheckoutInitialProps,
  action: any,
) => ({
  checkout: checkoutCartReducer(checkout, action),
});
