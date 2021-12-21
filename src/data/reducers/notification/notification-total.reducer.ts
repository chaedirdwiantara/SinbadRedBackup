/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type NotificationTotalInitialProps =
  models.DetailItemProps<models.NotificationTotalSuccess>;
/** === INITIAL STATE === */
export const notificationTotalInitialState: NotificationTotalInitialProps = {
  data: {
    data: 0,
  },
  error: null,
  loading: false,
  refresh: false,
};
/** === REDUCER === */
export const notificaitonTotalReducer = simplifyReducer(
  notificationTotalInitialState,
  {
    /** => Process */
    [types.NOTIFICATION_TOTAL_PROCESS]() {
      return {
        ...notificationTotalInitialState,
        loading: true,
      };
    },
    /** => Success */
    [types.NOTIFICATION_TOTAL_SUCCESS](
      state = notificationTotalInitialState,
      { payload }: models.DetailSuccessAction<models.NotificationTotalSuccess>,
    ) {
      return {
        ...state,
        data: payload.data,
        loading: false,
        error: null,
      };
    },
    /** => Failed */
    [types.NOTIFICATION_TOTAL_FAILED](
      state = notificationTotalInitialState,
      { payload }: models.DetailFailedAction,
    ) {
      return {
        ...state,
        error: payload,
        loading: false,
      };
    },
    /** => Refresh */
    [types.NOTIFICATION_TOTAL_REFRESH]() {
      return {
        ...notificationTotalInitialState,
        loading: true,
      };
    },
    /** => Reset */
    [types.NOTIFICATION_TOTAL_RESET]() {
      return notificationTotalInitialState;
    },
  },
);
