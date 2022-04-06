/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const cancelOrderHistoryProcess = (
  contextDispatch: (action: any) => any,
  payload: models.UpdateOrderHistoryProcessProps,
): models.UpdateOrderHistoryProcessAction => {
  contextDispatch({ type: types.CANCEL_ORDER_HISTORY_PROCESS, payload });
  return {
    type: types.CANCEL_ORDER_HISTORY_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const cancelOrderHistorySuccess = (
  payload: models.UpdateSuccessV3Props<any>,
): models.UpdateSuccessV3Action<any> => {
  return { type: types.CANCEL_ORDER_HISTORY_SUCCESS, payload };
};
/** => Failed */
export const cancelOrderHistoryFailed = (
  payload: models.ErrorProps,
): models.UpdateFailedAction => {
  return { type: types.CANCEL_ORDER_HISTORY_FAILED, payload };
};
