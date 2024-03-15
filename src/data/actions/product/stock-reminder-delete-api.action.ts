/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
// process flow delete stock remider
/** => Process */
export const deleteStockReminderProcess = (
  contextDispatch: (action: any) => any,
  payload: models.StockReminderGetProps,
): models.CreateStockReminderProcessAction => {
  contextDispatch({ type: types.DELETE_STOCK_REMINDER_PROCESS, payload });
  return {
    type: types.DELETE_STOCK_REMINDER_PROCESS,
    payload: payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const deleteStockReminderSuccess = (
  contextDispatch: (action: any) => any,
  payload: models.CreateStockReminderSuccessProps,
): models.CreateStockReminderSuccessAction => {
  return {
    type: types.DELETE_STOCK_REMINDER_SUCCESS,
    payload,
    contextDispatch,
  };
};
/** => Failed */
export const deleteStockReminderFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.DELETE_STOCK_REMINDER_FAILED, payload };
};
/** => Reset */
export const deleteStockReminderReset = () => {
  return { type: types.DELETE_STOCK_REMINDER_RESET };
};
