/** === IMPORT PACKAGES === */
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTIONS === */
export const usePaymentDetail = () => {
  const dispatch = useDispatch();
  return {
    detail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.historyPaymentDetailProcess(contextDispatch, { id }));
    },
  };
};

export const usePaymentInvoice = () => {
  const dispatch = useDispatch();
  return {
    detail: (contextDispatch: (action: any) => any, id: string) => {
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
  const toast = useRef<any>();
  return {
    isOpen,
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    toastText,
    setToastText: (value: string) => {
      setToastText(value);
    },
    toast,
  };
};

export const useHistoryDetailAction = () => {
  const dispatch = useDispatch();

  return {
    fetch: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.historyDetailProcess(contextDispatch, { id }));
    },
    refresh: (contextDispatch: (action: any) => any, id: string) => {
      contextDispatch(Actions.historyDetailRefresh());
      dispatch(Actions.historyDetailProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.historyDetailReset(contextDispatch));
    },
  };
};

export const useActivateVa = () => {
  const dispatch = useDispatch();
  return {
    update: (contextDispatch: (action: any) => any, id: number) => {
      dispatch(Actions.historyActivateVAProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.historyActivateVAReset(contextDispatch));
    },
  };
};

export const useDownloadProgress = () => {
  const [downloadProgress, setProgress] = useState(false);
  return {
    downloadProgress,
    setProgress: (value: boolean) => {
      setProgress(value);
    },
  };
};

export const useModaBottomError = () => {
  const [isOpen, setOpen] = useState(false);
  const [dataError, setDataError] = useState<models.ErrorProps | null>(null);
  return {
    isOpen,
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    dataError,
    setDataError: (value: models.ErrorProps) => {
      setDataError(value);
    },
  };
};
