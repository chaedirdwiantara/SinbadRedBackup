import { useContext } from 'react';

import { PaymentHistoryContext } from './payment-history.context';

export const usePaymentHistoryContext = () => {
  const context = useContext(PaymentHistoryContext);

  if (context === undefined) {
    throw new Error(
      'usePaymentHistoryContext was used outside of PaymentHistoryProvider',
    );
  }

  return context;
};
