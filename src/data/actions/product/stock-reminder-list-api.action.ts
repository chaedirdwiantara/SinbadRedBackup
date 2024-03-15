/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
// process flow get stock remider list
/** => Process */
export const stockReminderListProcess = (
  contextDispatch: (action: any) => any,
  payload: models.StockReminderProcessProps,
): models.StockReminderListProcessAction => {
  contextDispatch({ type: types.STOCK_REMINDER_LIST_PROCESS, payload });
  return {
    type: types.STOCK_REMINDER_LIST_PROCESS,
    payload: payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const stockReminderListSuccess = (
  payload: models.ListSuccessProps<models.StockReminderItem[]>,
): models.ListSuccessAction<models.StockReminderItem[]> => {
  return { type: types.STOCK_REMINDER_LIST_SUCCESS, payload };
};
/** => Failed */
export const stockReminderListFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.STOCK_REMINDER_LIST_FAILED, payload };
};
/** => Refresh */
export const stockReminderListRefresh = () => {
  return { type: types.STOCK_REMINDER_LIST_REFRESH };
};
/** => Load More */
export const stockReminderListLoadMore = () => {
  return { type: types.STOCK_REMINDER_LIST_LOADMORE };
};
/** => Reset */
export const stockReminderListReset = () => {
  return { type: types.STOCK_REMINDER_LIST_RESET };
};
/** => Clear Contents */
export const stockReminderListClearContents = () => {
  return { type: types.STOCK_REMINDER_LIST_CLEAR_CONTENTS };
};
