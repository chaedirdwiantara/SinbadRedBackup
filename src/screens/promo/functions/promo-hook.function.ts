/** === IMPORT PACKAGE HERE === */
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
/** => promo general action */
const usePromoGeneralAction = () => {
  const dispatch = useDispatch();
  return {
    detail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.promoGeneralDetailProcess(contextDispatch, { id }));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.promoGeneralDetailReset());
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
      dispatch(Actions.createReserveDiscountProcess(contextDispatch, { data }));
    },
    detail: (contextDispatch: (action: any) => any, id: string) => {
      dispatch(Actions.detailReserveDiscountReset());
      dispatch(Actions.detailReserveDiscountProcess(contextDispatch, { id }));
    },
  };
};
/** === EXPORT === */
export {
  usePromoPaymentAction,
  usePromoGeneralAction,
  usePotentialPromoProductAction,
  useReserveDiscountAction,
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
