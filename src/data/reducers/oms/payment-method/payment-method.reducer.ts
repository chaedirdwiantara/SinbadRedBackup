/** === IMPORT HERE === */
import {
  paymentMethodListInitialState,
  paymentMethodListReducer,
  paymentMethodListInitialProps,
} from './payment-method-type.reducer';

/** === TYPE HERE === */
export interface PaymentMethodState {
  paymentMethod: paymentMethodListInitialProps;
}
/** === INITIAL HERE === */
export const paymentMethodInitialState = {
  paymentMethod: paymentMethodListInitialState,
};
/** === EXPORT ALL HERE === */
export const paymentMethodReducer = (
  { paymentMethod }: PaymentMethodState,
  action: any,
) => ({
  paymentMethod: paymentMethodListReducer(paymentMethod, action),
});
