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
  return Actions.orderConsolidateHistoryDetailProcess(contextDispatch, {
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

export const useHistoryConsolidateDetailActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      payload: models.OrderHistoryDetailProcessProps,
    ) => {
      contextDispatch(Actions.orderConsolidateHistoryDetailReset(dispatch));
      dispatch(callProcessAction(contextDispatch, payload));
    },
    refresh: (
      contextDispatch: (action: any) => any,
      payload: models.OrderHistoryDetailProcessProps,
    ) => {
      contextDispatch(Actions.orderConsolidateHistoryDetailRefresh());
      dispatch(callProcessAction(contextDispatch, payload));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.orderConsolidateHistoryDetailReset(dispatch));
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
