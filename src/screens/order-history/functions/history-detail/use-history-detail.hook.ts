/** === IMPORT PACKAGE === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTIONS === */
const callProcessAction = (
  contextDispatch: (action: any) => any,
  payload: models.OrderHistoryDetailProcessProps,
) => {
  return Actions.orderHistoryDetailProcess(contextDispatch, {
    ...payload,
  });
};
const callCancelAction = (
  contextDispatch: (action: any) => any,
  payload: models.UpdateOrderHistoryProcessProps,
) => {
  return Actions.cancelOrderHistoryProcess(contextDispatch, {
    ...payload,
  });
};
const callDoneAction = (
  contextDispatch: (action: any) => any,
  payload: models.UpdateOrderHistoryProcessProps,
) => {
  return Actions.doneOrderHistoryProcess(contextDispatch, {
    ...payload,
  });
};

export const useHistoryDetailActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      payload: models.OrderHistoryDetailProcessProps,
    ) => {
      contextDispatch(Actions.orderHistoryDetailReset(dispatch));
      dispatch(callProcessAction(contextDispatch, payload));
    },
    refresh: (
      contextDispatch: (action: any) => any,
      payload: models.OrderHistoryDetailProcessProps,
    ) => {
      contextDispatch(Actions.orderHistoryDetailRefresh());
      dispatch(callProcessAction(contextDispatch, payload));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.orderHistoryDetailReset(dispatch));
    },
    done: (
      contextDispatch: (action: any) => any,
      payload: models.UpdateOrderHistoryProcessProps,
    ) => {
      dispatch(callDoneAction(contextDispatch, payload));
    },
    cancel: (
      contextDispatch: (action: any) => any,
      payload: models.UpdateOrderHistoryProcessProps,
    ) => {
      dispatch(callCancelAction(contextDispatch, payload));
    },
  };
};
