import React from 'react';
import {
  PaymentMethodState,
  paymentMethodInitialState,
  paymentMethodReducer,
} from '@reducer/oms/payment-method/payment-method.reducer';

const PaymentMethodContext = React.createContext<{
  // state: InitialStateType;
  statePaymentMethod: PaymentMethodState;
  dispatchCheckout: React.Dispatch<any>;
}>({
  // state: initialState,
  statePaymentMethod: paymentMethodInitialState,
  dispatchCheckout: () => null,
});

export {
  PaymentMethodContext,
  paymentMethodReducer,
  paymentMethodInitialState,
};
