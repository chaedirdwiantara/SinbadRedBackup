/** === IMPORT INTERNAL === */
import {
  checkoutViewInitialState,
  CheckoutViewInitialProps,
  checkoutViewReducer,
} from './checkout-detail.reducer';

export interface CheckoutState {
  checkout: CheckoutViewInitialProps;
}
/** === INITIAL STATE === */
export const checkoutInitialState = {
  checkout: checkoutViewInitialState,
};
/** === REDUCER === */
export const checkoutReducer = ({ checkout }: CheckoutState, action: any) => ({
  checkout: checkoutViewReducer(checkout, action),
});
