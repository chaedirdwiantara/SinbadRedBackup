import React from 'react';
import {
  MerchantInitialProps,
  supplierInitialState,
  merchantReducer,
} from '@reducer/merchant/merchant.reducer';
import {
    PaymentInitialProps,
    paymentInitialState,
    paymentReducer
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