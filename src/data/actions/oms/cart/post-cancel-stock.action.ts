/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => PROCESS */
export const postCancelStockProcess = (
  contextDispatch: (action: any) => any,
): Omit<models.DeleteProcessAction, 'payload'> => {
  contextDispatch({ type: types.POST_CANCEL_STOCK_PROCESS });
  return {
    type: types.POST_CANCEL_STOCK_PROCESS,
    contextDispatch,
  };
};
/** => SUCCESS */
export const postCancelStockSuccess = (
  data: models.DeleteSuccessV3Props,
): models.DeleteSuccessV3Action => {
  return { type: types.POST_CANCEL_STOCK_SUCCESS, payload: data };
};
/** => FAILED */
export const postCancelStockFailed = (
  data: models.ErrorProps,
): models.DeleteFailedAction => {
  return { type: types.POST_CANCEL_STOCK_FAILED, payload: data };
};
/** => RESET */
export const postCancelStockReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.POST_CANCEL_STOCK_RESET });
  return { type: types.POST_CANCEL_STOCK_RESET };
};
