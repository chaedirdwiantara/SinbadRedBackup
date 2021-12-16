/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** Process */
export const orderStatusProcess = (
  contextDispatch: (action: any) => any,
  payload: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.HISTORY_ORDER_STATUS_PROCESS, payload });
  return {
    type: types.HISTORY_ORDER_STATUS_PROCESS,
    payload,
    contextDispatch,
  };
};
/** Succeeded */
export const orderStatusSuccess = (
  payload: models.ListSuccessProps<Array<models.OrderStatus>>,
): models.ListSuccessAction<Array<models.OrderStatus>> => {
  return { type: types.HISTORY_ORDER_STATUS_SUCCESS, payload };
};
/** Failed */
export const orderStatusFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.HISTORY_ORDER_STATUS_FAILED, payload };
};
/** Refresh */
export const orderStatusRefresh = () => {
  return { type: types.HISTORY_ORDER_STATUS_REFRESH };
};
