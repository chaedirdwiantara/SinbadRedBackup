/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
/** === FUNCTION === */
/** => promo payment action */
const usePromoPaymentAction = () => {
  const dispatch = useDispatch();
  return {
    list: (contextDispatch: (action: any) => any) => {
      dispatch(
        Actions.promoPaymentListProcess(contextDispatch, {
          loading: true,
          limit: 0,
          skip: 0,
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
/** === EXPORT === */
export { usePromoPaymentAction, usePromoGeneralAction };
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
