/** === IMPORT HERE === */
import {
  paymentMethodTypeInitialState,
  paymentMethodTypeReducer,
  PaymentMethodTypeInitialProps,
} from './payment-method-type.reducer';

/** === TYPE HERE === */
export interface PaymentMethodState {
  paymentMethod: PaymentMethodTypeInitialProps;
}
/** === INITIAL HERE === */
export const paymentMethodInitialState = {
  paymentMethod: paymentMethodTypeInitialState,
};
/** === EXPORT ALL HERE === */
export const paymentMethodReducer = (
  { paymentMethod }: PaymentMethodState,
  action: any,
) => ({
  paymentMethod: paymentMethodTypeReducer(paymentMethod, action),
});
