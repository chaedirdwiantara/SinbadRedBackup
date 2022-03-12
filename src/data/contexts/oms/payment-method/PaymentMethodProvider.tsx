import React from 'react';
import {
  PaymentMethodContext,
  paymentMethodInitialState,
  paymentMethodReducer,
} from './paymentMethod.context';

const PaymentMethodProvider: React.FC = ({ children }) => {
  const [statePaymentMethod, dispatchPaymentMethod] = React.useReducer(
    paymentMethodReducer,
    paymentMethodInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      statePaymentMethod,
      dispatchPaymentMethod,
    }),
    [statePaymentMethod, dispatchPaymentMethod],
  );
  return (
    <PaymentMethodContext.Provider value={valueProvider}>
      {children}
    </PaymentMethodContext.Provider>
  );
};

export { PaymentMethodProvider, PaymentMethodContext };
