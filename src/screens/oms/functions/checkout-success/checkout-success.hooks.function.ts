import React from 'react';
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE */
import * as Action from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';

/** === FUNCTION === */
/** => GET ORDERS DETAIL */
const useOrdersDetail = () => {
  const dispatch = useDispatch();

  return {
    get: (contextDispatch: (actions: any) => any, id: number) =>
      dispatch(Action.getOrdersDetailProcess(contextDispatch, { id })),
    reset: (contextDispatch: (actions: any) => any) =>
      dispatch(Action.getOrdersDetailReset(contextDispatch)),
  };
};

export { useOrdersDetail };
