/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { useDataReserve } from '@core/redux/Data';
/** === FUNCTION === */
/** => verification action */
const useVerficationOrderAction = () => {
  const dispatch = useDispatch();
  return {
    verificationOrderCreate: (
      contextDispatch: (action: any) => any,
      data: models.CartSelected,
    ) => {
      dispatch(Actions.verificationOrderCreateProcess(contextDispatch, data));
    },
    verificationOrderDetail: (
      contextDispatch: (action: any) => any,
      id: string,
    ) => {
      dispatch(Actions.verificationOrderDetailProcess(contextDispatch, { id }));
    },
    verificationReset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.verificationOrderCreateReset());
      contextDispatch(Actions.verificationOrderDetailReset());
    },
  };
};
/** => reserve data action */
const useReserveDataAction = () => {
  const dispatch = useDispatch();
  const reserveData = useDataReserve();
  return {
    setReservedAt: (time: string) => {
      dispatch(Actions.setReservedAt({ reservedAt: time }));
    },
    reserveData,
  };
};
/** => promo accordion */
const usePromoAccordion = () => {
  const [activeIndex, setIndex] = React.useState<number | null>(null);
  return {
    setIndex: (newIndex: number) => {
      if (activeIndex === newIndex) {
        setIndex(null);
      } else {
        setIndex(newIndex);
      }
    },
    activeIndex,
  };
};
/** => standard modal state */
const useStandardModalState = () => {
  const [isOpen, setOpen] = React.useState(false);
  return {
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    isOpen,
  };
};
/** => standard boolean state */
const useStandardLoadingState = () => {
  const [isLoading, setLoading] = React.useState(false);
  return {
    setLoading: (value: boolean) => {
      setLoading(value);
    },
    isLoading,
  };
};
/** => failed fetch state */
const useVerificationFailedFetchState = () => {
  const [isOpen, setOpen] = React.useState(false);
  const [errorAction, setErrorAction] = React.useState<Function>(() => {});
  const [errorText, setErrorText] = React.useState('');
  return {
    setOpen: (value: boolean) => {
      setOpen(value);
    },
    setErrorAction: (value: () => void) => {
      setErrorAction(value);
    },
    setErrorText: (value: string) => {
      setErrorText(value);
    },
    isOpen,
    errorAction,
    errorText,
  };
};
/** === EXPORT === */
export {
  useVerficationOrderAction,
  useReserveDataAction,
  usePromoAccordion,
  useStandardModalState,
  useStandardLoadingState,
  useVerificationFailedFetchState,
};
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
