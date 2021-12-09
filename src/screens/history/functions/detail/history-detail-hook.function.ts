/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';

/** === FUNCTIONS === */
export const usePaymentDetail = () => {
  const dispatch = useDispatch();
  return {
    detail: (contextDispatch: (action: any) => any, id: number) => {
      dispatch(Actions.historyPaymentDetailProcess(contextDispatch, { id }));
    },
  };
};

export const usePaymentInvoice = () => {
  const dispatch = useDispatch();
  return {
    detail: (contextDispatch: (action: any) => any, id: number) => {
      dispatch(
        Actions.historyPaymentInvoiceDetailProcess(contextDispatch, { id }),
      );
    },
  };
};
