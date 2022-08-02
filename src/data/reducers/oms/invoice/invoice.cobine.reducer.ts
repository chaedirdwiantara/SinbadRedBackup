/** === IMPORT INTERNAL === */
import {
  InvoiceInitialState,
  InvoiceProps,
  InvoiceReducer,
} from './invoice.reducer';
/** === TYPE === */
export interface InvoiceState {
  invoice: InvoiceProps;
}
/** === INITIAL STATE === */
export const invoiceInitialState = {
  invoice: InvoiceInitialState,
};
/** === REDUCER === */
export const invoiceReducer = ({ invoice }: InvoiceState, action: any) => ({
  invoice: InvoiceReducer(invoice, action),
});
