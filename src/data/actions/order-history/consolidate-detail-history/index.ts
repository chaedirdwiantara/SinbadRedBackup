/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const orderConsolidateHistoryDetailProcess = (
  contextDispatch: (action: any) => any,
  payload: models.OrderHistoryDetailProcessProps,
): models.OrderHistoryDetailProcessAction => {
  contextDispatch({
    type: types.ORDER_CONSOLIDATE_HISTORY_DETAIL_PROCESS,
    payload,
  });
  return {
    type: types.ORDER_CONSOLIDATE_HISTORY_DETAIL_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const orderConsolidateHistoryDetailSuccess = (
  payload: models.DetailSuccessProps<models.orderDetailHistory>,
): models.DetailSuccessAction<models.orderDetailHistory> => {
  return { type: types.ORDER_CONSOLIDATE_HISTORY_DETAIL_SUCCESS, payload };
};
/** => Failed */
export const orderConsolidateHistoryDetailFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.ORDER_CONSOLIDATE_HISTORY_DETAIL_FAILED, payload };
};
/** => Refresh */
export const orderConsolidateHistoryDetailRefresh = () => {
  return { type: types.ORDER_CONSOLIDATE_HISTORY_DETAIL_REFRESH };
};
/** => Reset */
export const orderConsolidateHistoryDetailReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.ORDER_CONSOLIDATE_HISTORY_DETAIL_RESET });
  return { type: types.ORDER_CONSOLIDATE_HISTORY_DETAIL_RESET };
};
