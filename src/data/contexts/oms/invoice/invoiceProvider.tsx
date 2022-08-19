import React, { FC, useReducer, useMemo } from 'react';

import {
  InvoiceContext,
  invoiceReducer,
  invoiceInitialState,
} from './invoice.context';

const InvoiceProvider: FC = ({ children }) => {
  const [stateInvoice, dispatchInvoice] = useReducer(
    invoiceReducer,
    invoiceInitialState,
  );
  const contextValue = useMemo(
    () => ({
      stateInvoice,
      dispatchInvoice,
    }),
    [stateInvoice, dispatchInvoice],
  );

  return (
    <InvoiceContext.Provider value={contextValue}>
      {children}
    </InvoiceContext.Provider>
  );
};

export { InvoiceProvider, InvoiceContext };
