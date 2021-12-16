/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
import { useState } from 'react';

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
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(
        Actions.historyPaymentInvoiceDetailReset(contextDispatch),
      );
    },
  };
};

export const useModalToast = () => {
  const [isOpen, setOpen] = useState(false);
  const [toastText, setToastText] = useState('');
  return {
    isOpen,
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    toastText,
    setToastText: (value: string) => {
      setToastText(value);
    },
  };
};
