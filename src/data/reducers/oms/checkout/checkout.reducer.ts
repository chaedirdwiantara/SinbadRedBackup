/** === IMPORT INTERNAL === */
import {
  checkoutViewInitialState,
  CheckoutViewInitialProps,
  checkoutViewReducer,
} from './checkout-detail.reducer';

import {
  CreateOrderInitialProps,
  createOrderInitialState,
  createOrderReducer,
} from './create-orders.reducer';

export interface CheckoutState {
  checkout: CheckoutViewInitialProps;
  create: CreateOrderInitialProps;
}
/** === INITIAL STATE === */
export const checkoutInitialState = {
  checkout: checkoutViewInitialState,
  create: createOrderInitialState,
};
/** === REDUCER === */
export const checkoutReducer = (
  { checkout, create }: CheckoutState,
  action: any,
) => ({
  checkout: checkoutViewReducer(checkout, action),
  create: createOrderReducer(create, action),
});
