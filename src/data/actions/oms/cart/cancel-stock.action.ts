/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => PROCESS */
export const cancelStockProcess = (
  contextDispatch: (action: any) => any,
): Omit<models.DeleteProcessAction, 'payload'> => {
  contextDispatch({ type: types.CANCEL_STOCK_PROCESS });
  return {
    type: types.CANCEL_STOCK_PROCESS,
    contextDispatch,
  };
};
/** => SUCCESS */
export const cancelStockSuccess = (
  data: models.DeleteSuccessV3Props,
): models.DeleteSuccessV3Action => {
  return { type: types.CANCEL_STOCK_SUCCESS, payload: data };
};
/** => FAILED */
export const cancelStockFailed = (
  data: models.ErrorProps,
): models.DeleteFailedAction => {
  return { type: types.CANCEL_STOCK_FAILED, payload: data };
};
/** => RESET */
export const cancelStockReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.CANCEL_STOCK_RESET });
  return { type: types.CANCEL_STOCK_RESET };
};
