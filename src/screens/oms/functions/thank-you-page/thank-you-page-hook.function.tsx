/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { useDataReserve } from '@core/redux/Data';
/** === FUNCTION === */
/** => thank you page action */
const useThankYouPageAction = () => {
  const dispatch = useDispatch();
  return {
    thankYoupageOrderDetail: (
      contextDispatch: (action: any) => any,
      id: string
    ) => {
      dispatch(Actions.thankYouPageOrderDetailProcess(contextDispatch, {id}))
    },
    thankYouPageReset: (contextDispatch: (action:any) => any) => {
      contextDispatch(Actions.thankYouPageOrderDetailReset());
    }
  }
}
/** === EXPORT === */
export {
  useThankYouPageAction
}