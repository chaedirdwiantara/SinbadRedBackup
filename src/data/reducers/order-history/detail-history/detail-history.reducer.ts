/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type DetailHistoryProps =
  models.DetailItemProps<models.orderDetailHistory>;
/** === INITIAL STATE === */
export const detailHistoryInitialState: DetailHistoryProps = {
  data: null,
  loading: true,
  refresh: false,
  error: null,
};
/** === REDUCER === */
export const detailHistoryReducer = simplifyReducer(detailHistoryInitialState, {
  /** => Process */
  [types.ORDER_HISTORY_DETAIL_PROCESS]() {
    return {
      ...detailHistoryInitialState,
      loading: true,
    };
  },
  /** => Succeeded */
  [types.ORDER_HISTORY_DETAIL_SUCCESS](
    state = detailHistoryInitialState,
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
  [types.ORDER_HISTORY_DETAIL_FAILED](
    state = detailHistoryInitialState,
    { payload }: models.DetailFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: payload,
    };
  },
  /** => Refresh */
  [types.ORDER_HISTORY_DETAIL_REFRESH]() {
    return {
      ...detailHistoryInitialState,
      refresh: true,
    };
  },
  /** => Reset */
  [types.ORDER_HISTORY_DETAIL_RESET]() {
    return detailHistoryInitialState;
  },
});
