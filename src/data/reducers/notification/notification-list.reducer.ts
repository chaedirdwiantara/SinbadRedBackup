/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type NotificationListInitialProps = models.ListItemProps<
  models.NotificationListSuccessProps[]
>;
/** === INITIAL STATE HERE */
export const notificationlistInitialState: NotificationListInitialProps = {
  data: [],
  error: null,
  loading: false,
  loadMore: false,
  refresh: false,
  total: 0,
  skip: 0,
};
/** === FUNCTION HERE === */
export const notificationListReducer = simplifyReducer(
  notificationlistInitialState,
  {
    /** ===> LIST */
    /** => list process */
    [types.NOTIFICATION_LIST_PROCESS](
      state = notificationlistInitialState,
      action: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: action.payload.loading,
        error: null,
      };
    },
    /** => list success */
    [types.NOTIFICATION_LIST_SUCCESS](
      state = notificationlistInitialState,
      action: models.ListSuccessAction<models.NotificationListSuccessProps[]>,
    ) {
      return {
        ...state,
        data: [...state.data, ...action.payload.data],
        loading: false,
        loadMore: false,
        refresh: false,
        total: action.payload.meta.total,
        skip: action.payload.meta.skip,
      };
    },
    /** => list failed */
    [types.NOTIFICATION_LIST_FAILED](
      state = notificationlistInitialState,
      action: models.ListFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        loadMore: false,
        refresh: false,
        error: action.payload,
      };
    },
    /** => list reset */
    [types.NOTIFICATION_LIST_RESET]() {
      return notificationlistInitialState;
    },
    /** => list refresh */
    [types.NOTIFICATION_LIST_REFRESH]() {
      return {
        ...notificationlistInitialState,
        refresh: true,
      };
    },
    /** => list load more */
    [types.NOTIFICATION_LIST_LOADMORE](state = notificationlistInitialState) {
      return {
        ...state,
        loadMore: true,
      };
    },
  },
);
