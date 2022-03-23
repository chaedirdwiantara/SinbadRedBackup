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
  };
};
