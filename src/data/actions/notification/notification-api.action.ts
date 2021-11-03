import * as types from '@types';
import * as models from '@models';
/** === NOTIFICATION LIST === */
/** => notification list process */
export const notificationListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types, payload: data });
  return {
    type: types.NOTIFICATION_LIST_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => notification list success */
export const notificationListSuccess = (
  data: models.DetailSuccessProps<models.NotificationListSuccessProps>,
): models.DetailSuccessAction<models.NotificationListSuccessProps> => {
  return { type: types.NOTIFICATION_LIST_SUCCESS, payload: data };
};
/** => notification list failed */
export const notificationListFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.NOTIFICATION_LIST_FAILED, payload: data };
};
/** => notification list refresh */
export const notificationListRefresh = () => {
  return { type: types.NOTIFICATION_LIST_REFRESH };
};
/** => notification list reset */
export const notificationListReset = () => {
  return { type: types.NOTIFICATION_LIST_RESET };
};
/** => notification list more */
export const notificationListLoadMore = () => {
  return { type: types.NOTIFICATION_LIST_LOADMORE };
};
