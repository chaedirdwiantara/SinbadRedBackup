import * as types from '@types';
import * as models from '@models';

/** === HISTORY PAYMENT INVOICE === */
/** => payment invoice process */
export const historyPaymentInvoiceDetailProcess = (
  contextDispatch: (action: any) => any,
  payload: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types.HISTORY_INVOICE_DETAIL_PROCESS, payload });
  return {
    type: types.HISTORY_INVOICE_DETAIL_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => payment invoice success */
export const historyPaymentInvoiceDetailSuccess = (
  payload: models.DetailSuccessProps<models.PaymentInvoiceSuccessProps>,
): models.DetailSuccessAction<models.PaymentInvoiceSuccessProps> => {
  return { type: types.HISTORY_INVOICE_DETAIL_SUCCESS, payload };
};
/** => payment invoice failed */
export const historyPaymentInvoiceDetailFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.HISTORY_INVOICE_DETAIL_FAILED, payload };
};
