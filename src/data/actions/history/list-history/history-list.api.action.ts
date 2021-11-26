/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';

/** === ACTIONS === */
/** => Process */
export const historyListProcess = (
  contextDispatch: (action: any) => any,
  payload: models.HistoryListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.HISTORY_LIST_PROCESS, payload });
  return { type: types.HISTORY_LIST_PROCESS, payload, contextDispatch };
};
/** => Success */
export const historyListSuccess = (
  payload: models.ListSuccessProps<Array<models.HistoryListSuccessProps>>,
): models.ListSuccessAction<models.OrderParcels[]> => {
  return { type: types.HISTORY_LIST_SUCCESS, payload };
};
/** => Failed */
export const historyListFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.HISTORY_LIST_FAILED, payload };
};
/** => Refresh */
export const historyListRefresh = () => {
  return { type: types.HISTORY_LIST_REFRESH };
};
/** => Load More */
export const historyListLoadMore = () => {
  return { type: types.HISTORY_LIST_LOADMORE };
};
/** => Reset */
export const historyListReset = () => {
  return { type: types.HISTORY_LIST_RESET };
};
