import { useContext } from 'react';

import { VerificationOrderContext } from './verification-order.context';

export const useVerificationOrderContext = () => {
  const context = useContext(VerificationOrderContext);

  if (context === undefined) {
    throw new Error(
      'useVerificationOrderContext was used outside of SupplierProvider',
    );
  }

  return context;
};
