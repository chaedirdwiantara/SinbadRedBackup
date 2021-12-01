import React from 'react';
import {
  PaymentInitialProps,
  paymentInitialState,
  paymentReducer,
} from '@reducer/oms/payment/payment.reducer';
const PaymentContext = React.createContext<{
  // state: InitialStateType;
  statePayment: PaymentInitialProps;
  dispatchPayment: React.Dispatch<any>;
}>({
  // state: initialState,
  statePayment: paymentInitialState,
  dispatchPayment: () => null,
});

export { PaymentContext, paymentReducer, paymentInitialState };
