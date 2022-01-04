/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const historyDetailProcess = (
  contextDispatch: (action: any) => any,
  payload: models.HistoryDetailProcessProps,
): models.HistoryDetailProcessAction => {
  contextDispatch({ type: types.HISTORY_DETAIL_PROCESS, payload });
  return {
    type: types.HISTORY_DETAIL_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const historyDetailSuccess = (
  payload: models.DetailSuccessProps<models.HistoryDetail>,
): models.DetailSuccessAction<models.HistoryDetail> => {
  return { type: types.HISTORY_DETAIL_SUCCESS, payload };
};
/** => Failed */
export const historyDetailFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.HISTORY_DETAIL_FAILED, payload };
};
/** => Refresh */
export const historyDetailRefresh = () => {
  return { type: types.HISTORY_DETAIL_REFRESH };
};
/** => Reset */
export const historyDetailReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.HISTORY_DETAIL_RESET });
  return { type: types.HISTORY_DETAIL_RESET };
};
