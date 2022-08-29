/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const InvoiceProcess = (
  contextDispatch: (action: any) => any,
  payload: models.InvoiceProcessProps,
): models.InvoiceProcessAction => {
  contextDispatch({
    type: types.INVOICE_PROCESS,
    payload,
  });
  return {
    type: types.INVOICE_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const InvoiceSuccess = (
  payload: models.DetailSuccessProps<models.Invoice>,
): models.DetailSuccessAction<models.Invoice> => {
  return { type: types.INVOICE_SUCCESS, payload };
};
/** => Failed */
export const InvoiceFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.INVOICE_FAILED, payload };
};
/** => Refresh */
export const InvoiceRefresh = () => {
  return { type: types.INVOICE_REFRESH };
};
/** => Reset */
export const InvoiceReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.INVOICE_RESET });
  return { type: types.INVOICE_RESET };
};
