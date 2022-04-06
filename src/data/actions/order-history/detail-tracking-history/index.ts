/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const orderHistoryTrackingDetailProcess = (
  contextDispatch: (action: any) => any,
  payload: models.OrderHistoryDetailProcessProps,
): models.OrderHistoryDetailProcessAction => {
  contextDispatch({
    type: types.ORDER_HISTORY_TRACKING_DETAIL_PROCESS,
    payload,
  });
  return {
    type: types.ORDER_HISTORY_TRACKING_DETAIL_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const orderHistoryTrackingDetailSuccess = (
  payload: models.DetailSuccessProps<models.orderTrackingDetailHistory>,
): models.DetailSuccessAction<models.orderTrackingDetailHistory> => {
  return { type: types.ORDER_HISTORY_TRACKING_DETAIL_SUCCESS, payload };
};
/** => Failed */
export const orderHistoryTrackingDetailFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.ORDER_HISTORY_TRACKING_DETAIL_FAILED, payload };
};
/** => Refresh */
export const orderHistoryTrackingDetailRefresh = () => {
  return { type: types.ORDER_HISTORY_TRACKING_DETAIL_REFRESH };
};
/** => Reset */
export const orderHistoryTrackingDetailReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.ORDER_HISTORY_TRACKING_DETAIL_RESET });
  return { type: types.ORDER_HISTORY_TRACKING_DETAIL_RESET };
};
