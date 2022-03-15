/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const orderHistoryListProcess = (
  contextDispatch: (action: any) => any,
  payload: models.OrderListHistoryProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.ORDER_HISTORY_LIST_PROCESS, payload });
  return { type: types.ORDER_HISTORY_LIST_PROCESS, payload, contextDispatch };
};
/** => Succeeded */
export const orderHistoryListSuccess = (
  payload: models.ListSuccessProps<Array<models.OrderListHistory>>,
): models.ListSuccessAction<models.OrderListHistory[]> => {
  return { type: types.ORDER_HISTORY_LIST_SUCCESS, payload };
};
/** => Failed */
export const orderHistoryListFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.ORDER_HISTORY_LIST_FAILED, payload };
};
/** => Refresh */
export const orderHistoryListRefresh = () => {
  return { type: types.ORDER_HISTORY_LIST_REFRESH };
};
/** => Load More */
export const orderHistoryListLoadMore = () => {
  return { type: types.ORDER_HISTORY_LIST_LOADMORE };
};
/** => Reset */
export const orderHistoryListReset = () => {
  return { type: types.ORDER_HISTORY_LIST_RESET };
};
