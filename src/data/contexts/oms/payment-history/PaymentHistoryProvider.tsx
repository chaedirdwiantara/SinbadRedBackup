import React, { FC, useReducer, useMemo } from 'react';

import {
  PaymentHistoryContext,
  paymentHistoryReducer,
  paymentHistoryInitialState,
} from './payment-history.context';

const PaymentHistoryProvider: FC = ({ children }) => {
  const [statePaymentHistory, dispatchPaymentHistory] = useReducer(
    paymentHistoryReducer,
    paymentHistoryInitialState,
  );
  const contextValue = useMemo(
    () => ({
      statePaymentHistory,
      dispatchPaymentHistory,
    }),
    [statePaymentHistory, dispatchPaymentHistory],
  );

  return (
    <PaymentHistoryContext.Provider value={contextValue}>
      {children}
    </PaymentHistoryContext.Provider>
  );
};

export { PaymentHistoryProvider, PaymentHistoryContext };
