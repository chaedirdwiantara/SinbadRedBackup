/** === IMPORT HERE === */
import {
  paymentMethodListInitialState,
  paymentMethodListReducer,
  paymentMethodListInitialProps,
} from './payment-method-type.reducer';
import {
  paymentMethodGetWaitingPaymentOrderInitialState,
  paymentMethodGerWaitingPaymentOrderReducer,
  paymentMethodGetWaitingPaymentOrderInitialProps,
} from './payment-method-get-waiting-payment-order.reducer';

/** === TYPE HERE === */
export interface PaymentMethodState {
  paymentMethod: paymentMethodListInitialProps;
  getWaitingPaymentOrder: paymentMethodGetWaitingPaymentOrderInitialProps;
}
/** === INITIAL HERE === */
export const paymentMethodInitialState = {
  paymentMethod: paymentMethodListInitialState,
  getWaitingPaymentOrder: paymentMethodGetWaitingPaymentOrderInitialState,
};
/** === EXPORT ALL HERE === */
export const paymentMethodReducer = (
  { paymentMethod, getWaitingPaymentOrder }: PaymentMethodState,
  action: any,
) => ({
  paymentMethod: paymentMethodListReducer(paymentMethod, action),
  getWaitingPaymentOrder: paymentMethodGerWaitingPaymentOrderReducer(
    getWaitingPaymentOrder,
    action,
  ),
});
