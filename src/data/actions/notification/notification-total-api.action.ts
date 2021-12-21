/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const notificationTotalProcess = (): Omit<
  models.DetailProcessAction,
  'payload' | 'contextDispatch'
> => {
  return {
    type: types.NOTIFICATION_TOTAL_PROCESS,
  };
};
/** => Success */
export const notificationTotalSuccess = (
  payload: models.DetailSuccessProps<models.NotificationTotalSuccess>,
): models.DetailSuccessAction<models.NotificationTotalSuccess> => {
  return { type: types.NOTIFICATION_TOTAL_SUCCESS, payload };
};
/** => Failed */
export const notificationTotalFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.NOTIFICATION_TOTAL_FAILED, payload };
};
/** => Reset */
export const notificationTotalReset = () => {
  return { type: types.NOTIFICATION_TOTAL_RESET };
};
