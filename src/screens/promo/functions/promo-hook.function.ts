/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
/** === FUNCTION === */
/** => voucher cart list action */
const usePromoPaymentListAction = () => {
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
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.promoPaymentListReset());
    },
  };
};
/** === EXPORT === */
export { usePromoPaymentListAction };
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
