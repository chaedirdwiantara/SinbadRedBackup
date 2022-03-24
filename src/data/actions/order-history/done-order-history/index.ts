/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const doneOrderHistoryProcess = (
  contextDispatch: (action: any) => any,
  payload: models.UpdateOrderHistoryProcessProps,
): models.UpdateOrderHistoryProcessAction => {
  contextDispatch({ type: types.DONE_ORDER_HISTORY_PROCESS, payload });
  return {
    type: types.DONE_ORDER_HISTORY_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const doneOrderHistorySuccess = (
  payload: models.UpdateSuccessV3Props<any>,
): models.UpdateSuccessV3Action<any> => {
  return { type: types.DONE_ORDER_HISTORY_SUCCESS, payload };
};
/** => Failed */
export const doneOrderHistoryFailed = (
  payload: models.ErrorProps,
): models.UpdateFailedAction => {
  return { type: types.DONE_ORDER_HISTORY_FAILED, payload };
};
