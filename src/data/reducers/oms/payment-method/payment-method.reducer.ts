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
import {
  PaymentMethodCreateOrderInitialState,
  paymentMethodCreateOrderReducer,
  PaymentMethodCreateOrderInitialProps,
} from './payment-method-create-order.reducer';

/** === TYPE HERE === */
export interface PaymentMethodState {
  paymentMethod: paymentMethodListInitialProps;
  getWaitingPaymentOrder: paymentMethodGetWaitingPaymentOrderInitialProps;
  createOrder: PaymentMethodCreateOrderInitialProps;
}
/** === INITIAL HERE === */
export const paymentMethodInitialState = {
  paymentMethod: paymentMethodListInitialState,
  getWaitingPaymentOrder: paymentMethodGetWaitingPaymentOrderInitialState,
  createOrder: PaymentMethodCreateOrderInitialState,
};
/** === EXPORT ALL HERE === */
export const paymentMethodReducer = (
  { paymentMethod, getWaitingPaymentOrder, createOrder }: PaymentMethodState,
  action: any,
) => ({
  paymentMethod: paymentMethodListReducer(paymentMethod, action),
  getWaitingPaymentOrder: paymentMethodGerWaitingPaymentOrderReducer(
    getWaitingPaymentOrder,
    action,
  ),
  createOrder: paymentMethodCreateOrderReducer(createOrder, action),
});
