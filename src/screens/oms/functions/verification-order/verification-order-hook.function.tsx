/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTION === */
/** => call verification action */
const useVerficationOrderAction = () => {
  const dispatch = useDispatch();
  return {
    verificationOrderCreate: (
      contextDispatch: (action: any) => any,
      data: models.CreateProcessProps<{}>,
    ) => {
      dispatch(Actions.verificationOrderDetailReset());
      dispatch(Actions.verificationOrderCreateProcess(contextDispatch, data));
    },
    verificationOrderDetail: (
      contextDispatch: (action: any) => any,
      id: string,
    ) => {
      dispatch(Actions.verificationOrderDetailProcess(contextDispatch, { id }));
    },
  };
};
/** === EXPORT === */
export { useVerficationOrderAction };
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
