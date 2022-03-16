/** === IMPORT HERE === */
import {
  paymentMethodListInitialState,
  paymentMethodListReducer,
  paymentMethodListInitialProps,
} from './payment-method-type.reducer';
import {
  paymentMethodSubRtdbInitialState,
  paymentMethodSubRtdbReducer,
  paymentMethodSubRtdbProps,
} from './payment-method-sub-rtdb-order.reducer';
import {
  PaymentMethodCreateOrderInitialState,
  paymentMethodCreateOrderReducer,
  PaymentMethodCreateOrderInitialProps,
} from './payment-method-create-order.reducer';

/** === TYPE HERE === */
export interface PaymentMethodState {
  paymentMethod: paymentMethodListInitialProps;
  subOrderRtdb: paymentMethodSubRtdbProps;
  createOrder: PaymentMethodCreateOrderInitialProps;
}
/** === INITIAL HERE === */
export const paymentMethodInitialState = {
  paymentMethod: paymentMethodListInitialState,
  subOrderRtdb: paymentMethodSubRtdbInitialState,
  createOrder: PaymentMethodCreateOrderInitialState,
};
/** === EXPORT ALL HERE === */
export const paymentMethodReducer = (
  { paymentMethod, subOrderRtdb, createOrder }: PaymentMethodState,
  action: any,
) => ({
  paymentMethod: paymentMethodListReducer(paymentMethod, action),
  subOrderRtdb: paymentMethodSubRtdbReducer(subOrderRtdb, action),
  createOrder: paymentMethodCreateOrderReducer(createOrder, action),
});
