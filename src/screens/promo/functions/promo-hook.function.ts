/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
/** === FUNCTION === */
/** => voucher cart action */
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
/** === EXPORT === */
export { usePromoPaymentAction };
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
