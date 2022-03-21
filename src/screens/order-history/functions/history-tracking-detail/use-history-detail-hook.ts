/** === IMPORT PACKAGE === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTIONS === */
const callProcessAction = (
  contextDispatch: (action: any) => any,
  payload: models.OrderHistoryTrackingDetailProcessProps,
) => {
  return Actions.orderHistoryTrackingDetailProcess(contextDispatch, {
    ...payload,
  });
};

export const useHistoryTrackingDetailActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      payload: models.OrderHistoryTrackingDetailProcessProps,
    ) => {
      contextDispatch(Actions.orderHistoryTrackingDetailReset(dispatch));
      dispatch(callProcessAction(contextDispatch, payload));
    },
    refresh: (
      contextDispatch: (action: any) => any,
      payload: models.OrderHistoryTrackingDetailProcessProps,
    ) => {
      contextDispatch(Actions.orderHistoryTrackingDetailRefresh());
      dispatch(callProcessAction(contextDispatch, payload));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.orderHistoryTrackingDetailReset(dispatch));
    },
  };
};
