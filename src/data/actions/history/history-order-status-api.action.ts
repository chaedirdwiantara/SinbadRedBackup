/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** Process */
export const orderStatusProcess = (
  contextDispatch: (action: any) => any,
  payload: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types.HISTORY_ORDER_STATUS_PROCESS });
  return {
    type: types.HISTORY_ORDER_STATUS_PROCESS,
    payload,
    contextDispatch,
  };
};
/** Success */
export const orderStatusSuccess = (
  payload: models.DetailSuccessProps<models.OrderStatusSuccessProps>,
): models.DetailSuccessAction<models.OrderStatusSuccessProps> => {
  return { type: types.HISTORY_ORDER_STATUS_SUCCESS, payload };
};
/** Failed */
export const orderStatusFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.HISTORY_ORDER_STATUS_FAILED, payload };
};
/** Reset */
export const orderStatusRefresh = () => {
  return { type: types.HISTORY_ORDER_STATUS_REFRESH };
};
