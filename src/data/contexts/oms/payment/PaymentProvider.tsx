import React from 'react';
import {
  MerchantContext,
  merchantReducer,
  supplierInitialState,
} from './merchant.context';
import {
    PaymentContext,
    paymentReducer,
    paymentInitialState
} from './payment.context';
const PaymentProvider: React.FC = ({ children }) => {
  const [statePayment, dispatchPayment] = React.useReducer(
    paymentReducer,
    paymentInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      statePayment,
      dispatchPayment,
    }),
    [statePayment, dispatchPayment],
  );
  return (
    <PaymentContext.Provider value={valueProvider}>
      {children}
    </PaymentContext.Provider>
  );
};

export { PaymentProvider, PaymentContext };