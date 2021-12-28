/** === IMPORT INTERNAL === */
import {
  GetOrdersDetailInitialProps,
  getOrdersDetailInitialState,
  getOrdersDetailReducer,
} from './checkout-done-detail.reducer';

export interface CheckoutDoneState {
  detail: GetOrdersDetailInitialProps;
}
/** === INITIAL STATE === */
export const checkoutDoneInitialState = {
  detail: getOrdersDetailInitialState,
};
/** === REDUCER === */
export const checkoutDoneReducer = (
  { detail }: CheckoutDoneState,
  action: any,
) => ({
  detail: getOrdersDetailReducer(detail, action),
});
