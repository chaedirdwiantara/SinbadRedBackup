/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
// process flow create stock remider
/** => Process */
export const createStockReminderProcess = (
  contextDispatch: (action: any) => any,
  payload: models.StockReminderGetProps,
): models.CreateStockReminderProcessAction => {
  contextDispatch({ type: types.CREATE_STOCK_REMINDER_PROCESS, payload });
  return {
    type: types.CREATE_STOCK_REMINDER_PROCESS,
    payload: payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const createStockReminderSuccess = (
  contextDispatch: (action: any) => any,
  payload: models.CreateStockReminderSuccessProps,
): models.CreateStockReminderSuccessAction => {
  return {
    type: types.CREATE_STOCK_REMINDER_SUCCESS,
    payload,
    contextDispatch,
  };
};
/** => Failed */
export const createStockReminderFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.CREATE_STOCK_REMINDER_FAILED, payload };
};
/** => Reset */
export const createStockReminderReset = () => {
  return { type: types.CREATE_STOCK_REMINDER_RESET };
};
