/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type DetailTrackingHistoryProps =
  models.DetailItemProps<models.orderTrackingDetailHistory>;
/** === INITIAL STATE === */
export const detailTrackingHistoryInitialState: DetailTrackingHistoryProps = {
  data: null,
  loading: true,
  refresh: false,
  error: null,
};
/** === REDUCER === */
export const detailTrackingHistoryReducer = simplifyReducer(
  detailTrackingHistoryInitialState,
  {
    /** => Process */
    [types.ORDER_HISTORY_TRACKING_DETAIL_PROCESS]() {
      return {
        ...detailTrackingHistoryInitialState,
        loading: true,
      };
    },
    /** => Succeeded */
    [types.ORDER_HISTORY_TRACKING_DETAIL_SUCCESS](
      state = detailTrackingHistoryInitialState,
      { payload }: models.DetailSuccessAction<models.HistoryDetail>,
    ) {
      return {
        ...state,
        data: payload.data,
        loading: false,
        error: null,
        refresh: false,
      };
    },
    /** => Failed */
    [types.ORDER_HISTORY_TRACKING_DETAIL_FAILED](
      state = detailTrackingHistoryInitialState,
      { payload }: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
    /** => Refresh */
    [types.ORDER_HISTORY_TRACKING_DETAIL_REFRESH]() {
      return {
        ...detailTrackingHistoryInitialState,
        refresh: true,
      };
    },
    /** => Reset */
    [types.ORDER_HISTORY_TRACKING_DETAIL_RESET]() {
      return detailTrackingHistoryInitialState;
    },
  },
);
