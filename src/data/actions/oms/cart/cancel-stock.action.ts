/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => PROCESS */
export const cancelStockProcess = (
  contextDispatch: (action: any) => any,
): Omit<models.DetailProcessAction, 'payload'> => {
  contextDispatch({ type: types.CANCEL_STOCK_PROCESS });
  return {
    type: types.CANCEL_STOCK_PROCESS,
    contextDispatch,
  };
};
/** => SUCCESS */
export const cancelStockSuccess = () => {
  return { type: types.CANCEL_STOCK_SUCCESS };
};
/** => FAILED */
export const cancelStockFailed = () => {
  return { type: types.CANCEL_STOCK_FAILED };
};
/** => RESET */
export const cancelStockReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.CANCEL_STOCK_RESET });
  return { type: types.CANCEL_STOCK_RESET };
};
