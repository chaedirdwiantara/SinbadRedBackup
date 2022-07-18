/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const consolidateOrderHistoryListProcess = (
  contextDispatch: (action: any) => any,
  payload: models.ConsolidateOrderListHistoryProcessProps,
): models.ListProcessV3Action => {
  contextDispatch({ type: types.CONSOLIDATE_ORDER_HISTORY_LIST_PROCESS, payload });
  return { type: types.CONSOLIDATE_ORDER_HISTORY_LIST_PROCESS, payload, contextDispatch };
};
/** => Succeeded */
export const consolidateOrderHistoryListSuccess = (
  payload: models.ListSuccessV3Props<Array<models.ConsolidateOrderListHistory>>,
): models.ListSuccessV3Action<models.ConsolidateOrderListHistory[]> => {
  return { type: types.CONSOLIDATE_ORDER_HISTORY_LIST_SUCCESS, payload };
};
/** => Failed */
export const consolidateOrderHistoryListFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.CONSOLIDATE_ORDER_HISTORY_LIST_FAILED, payload };
};
/** => Refresh */
export const consolidateOrderHistoryListRefresh = () => {
  return { type: types.CONSOLIDATE_ORDER_HISTORY_LIST_REFRESH };
};
/** => Load More */
export const consolidateOrderHistoryListLoadMore = () => {
  return { type: types.CONSOLIDATE_ORDER_HISTORY_LIST_LOADMORE };
};
/** => Reset */
export const consolidateOrderHistoryListReset = () => {
  return { type: types.CONSOLIDATE_ORDER_HISTORY_LIST_RESET };
};
