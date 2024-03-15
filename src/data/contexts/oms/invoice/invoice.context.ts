import React from 'react';
import {
  InvoiceState,
  invoiceInitialState,
  invoiceReducer,
} from '@reducer/oms/invoice/invoice.cobine.reducer';

const InvoiceContext = React.createContext<{
  stateInvoice: InvoiceState;
  dispatchInvoice: React.Dispatch<any>;
}>({
  stateInvoice: invoiceInitialState,
  dispatchInvoice: () => null,
});

export { InvoiceContext, invoiceReducer, invoiceInitialState };
