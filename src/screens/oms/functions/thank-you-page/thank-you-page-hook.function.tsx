/** === IMPORT PACKAGE HERE === */
import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
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

const callListProcessAction = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  skip: number,
  limit: number,
  queryOptions: models.PaymentGuideQueryOptions,
) => {
  return Actions.thankYouPagePaymentGuideListProcess(contextDispatch, {
    loading,
    skip,
    limit,
    ...queryOptions,
  });
};

const useThankYouPagePaymentGuideListAction = () => {
  const dispatch = useDispatch();
  const limit = 3;

  return {
    /** => LIST */
    fetch: (
      contextDispatch: (action: any) => any,
      queryOptions: models.PaymentGuideQueryOptions,
    ) => {
      contextDispatch(Actions.thankYouPagePaymentGuideListReset());
      dispatch(
        callListProcessAction(contextDispatch, true, 0, limit, queryOptions),
      );
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.thankYouPagePaymentGuideListReset());
    },
  };
}

const useThankYouPageCancelOrderAction = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      data: models.CancelOrderPayload,      
    ) => {
      dispatch(Actions.thankYouPageCancelOrderProcess(contextDispatch, {data}))
    }, 
    reset: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.thankYouPageCancelOrderReset(contextDispatch))
    }
  }
}
/** === EXPORT === */
export {
  useThankYouPageAction,
  useThankYouPagePaymentGuideListAction,
  useThankYouPageCancelOrderAction
}