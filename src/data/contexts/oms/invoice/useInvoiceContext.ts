import { useContext } from 'react';

import { InvoiceContext } from './invoice.context';

export const useInvoiceContext = () => {
  const context = useContext(InvoiceContext);

  if (context === undefined) {
    throw new Error('useInvoiceContext was used outside of InvoiceProvider');
  }

  return context;
};
