import {
  CheckoutCartInitialProps,
  checkoutCartInitialState,
  checkoutCartReducer,
} from './checkout-cart.reducer';

import { 
  CheckoutTncInitialProps, 
  checkoutTncInitialState, 
  checkoutTncReducer 
} from './checkout-tnc.reducer'

export interface CheckoutInitialProps {
  checkout: CheckoutCartInitialProps;
  checkoutTnc: CheckoutTncInitialProps;
}
/** === INITIAL STATE === */
export const checkoutInitialState = {
  checkout: checkoutCartInitialState,
  checkoutTnc: checkoutTncInitialState
};
/** === REDUCER === */
export const checkoutReducer = (
  { 
    checkout, 
    checkoutTnc 
  }: CheckoutInitialProps,
  action: any,
) => ({
  checkout: checkoutCartReducer(checkout, action),
  checkoutTnc: checkoutTncReducer(checkoutTnc, action)
});
