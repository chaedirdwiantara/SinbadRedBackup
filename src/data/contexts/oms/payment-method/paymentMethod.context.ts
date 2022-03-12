import React from 'react';
import {
  PaymentMethodState,
  paymentMethodInitialState,
  paymentMethodReducer,
} from '@reducer/oms/payment-method/payment-method.reducer';

const PaymentMethodContext = React.createContext<{
  // state: InitialStateType;
  statePaymentMethod: PaymentMethodState;
  dispatchPaymentMethod: React.Dispatch<any>;
}>({
  // state: initialState,
  statePaymentMethod: paymentMethodInitialState,
  dispatchPaymentMethod: () => null,
});

export {
  PaymentMethodContext,
  paymentMethodReducer,
  paymentMethodInitialState,
};
