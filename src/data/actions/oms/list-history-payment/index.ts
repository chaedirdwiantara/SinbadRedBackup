/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const orderHistoryListPaymentProcess = (
  contextDispatch: (action: any) => any,
  payload: models.PaymentListHistoryProcessProps,
): models.ListProcessV3Action => {
  contextDispatch({ type: types.ORDER_HISTORY_LIST_PAYMENT_PROCESS, payload });
  return { type: types.ORDER_HISTORY_LIST_PAYMENT_PROCESS, payload, contextDispatch };
};
/** => Succeeded */
export const orderHistoryListPaymentSuccess = (
  payload: models.ListSuccessV3Props<Array<models.WaitingPaymentListHistory>>,
): models.ListSuccessV3Action<models.WaitingPaymentListHistory[]> => {
  return { type: types.ORDER_HISTORY_LIST_PAYMENT_SUCCESS, payload };
};
/** => Failed */
export const orderHistoryListPaymentFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.ORDER_HISTORY_LIST_PAYMENT_FAILED, payload };
};
/** => Refresh */
export const orderHistoryListPaymentRefresh = () => {
  return { type: types.ORDER_HISTORY_LIST_PAYMENT_REFRESH };
};
/** => Load More */
export const orderHistoryListPaymentLoadMore = () => {
  return { type: types.ORDER_HISTORY_LIST_PAYMENT_LOADMORE };
};
/** => Reset */
export const orderHistoryListPaymentReset = () => {
  return { type: types.ORDER_HISTORY_LIST_PAYMENT_RESET };
};
