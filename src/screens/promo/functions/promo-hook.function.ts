/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTION === */
/** => promo payment action */
const usePromoPaymentAction = () => {
  const dispatch = useDispatch();
  return {
    list: (contextDispatch: (action: any) => any, invoiceGroupId: string) => {
      dispatch(
        Actions.promoPaymentListProcess(contextDispatch, {
          loading: true,
          limit: 0,
          skip: 0,
          invoiceGroupId,
        }),
      );
    },
    detail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.promoPaymentDetailProcess(contextDispatch, { id }));
    },
    resetList: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.promoPaymentListReset());
    },
    resetDetail: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.promoPaymentDetailReset());
    },
  };
};
/** => promo seller action */
const usePromoSellerAction = () => {
  const dispatch = useDispatch();
  return {
    detail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.promoSellerDetailProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.promoSellerDetailReset());
    },
  };
};
/** => potential promo product action */
const usePotentialPromoProductAction = () => {
  const dispatch = useDispatch();
  return {
    detail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.potentialPromoProductProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.potentialPromoProductReset());
    },
  };
};
/** => reserve discount action */
const useReserveDiscountAction = () => {
  const dispatch = useDispatch();
  return {
    del: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.deleteReserveDiscountProcess(contextDispatch, { id }));
    },
    create: (
      contextDispatch: (action: any) => any,
      data: models.ReserveDiscountPostPayload,
    ) => {
      dispatch(Actions.createReserveDiscountProcess(contextDispatch, data));
    },
    detail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.detailReserveDiscountProcess(contextDispatch, { id }));
    },
    resetPostGet: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.createReserveDiscountReset());
      contextDispatch(Actions.detailReserveDiscountReset());
    },
    resetDelete: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.deleteReserveDiscountReset());
    },
  };
};
/** => check promo payment action (this for payment channel modal) */
const useCheckPromoPaymentAction = () => {
  const dispatch = useDispatch();
  return {
    list: (
      contextDispatch: (action: any) => any,
      data: models.CheckPromoPaymentGetPayload,
    ) => {
      dispatch(Actions.checkPromoPaymentProcess(contextDispatch, data));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.checkPromoPaymentReset());
    },
  };
};
/** => check all promo payment action (this for get last payment channel) */
const useCheckAllPromoPaymentAction = () => {
  const dispatch = useDispatch();
  return {
    create: (
      contextDispatch: (action: any) => any,
      data: models.CheckAllPromoPaymentPostPayload[],
    ) => {
      dispatch(
        Actions.createCheckAllPromoPaymentProcess(contextDispatch, data),
      );
    },
    list: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.getCheckAllPromoPaymentProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.createCheckAllPromoPaymentReset());
      contextDispatch(Actions.getCheckAllPromoPaymentReset());
    },
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

/** === EXPORT === */
export {
  usePromoPaymentAction,
  usePromoSellerAction,
  usePotentialPromoProductAction,
  useReserveDiscountAction,
  useCheckPromoPaymentAction,
  useCheckAllPromoPaymentAction,
  useStandardModalState,
};
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: ryan (team)
 * createDate: 27092021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
