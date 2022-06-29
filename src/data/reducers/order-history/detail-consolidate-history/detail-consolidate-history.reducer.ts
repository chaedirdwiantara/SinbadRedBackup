/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type DetailConsolidateHistoryProps =
  models.DetailItemProps<models.orderDetailHistory>;
/** === INITIAL STATE === */
export const detailConsolidateHistoryInitialState: DetailConsolidateHistoryProps =
  {
    data: null,
    loading: true,
    refresh: false,
    error: null,
  };
/** === REDUCER === */
export const detailConsolidateHistoryReducer = simplifyReducer(
  detailConsolidateHistoryInitialState,
  {
    /** => Process */
    [types.ORDER_CONSOLIDATE_HISTORY_DETAIL_PROCESS]() {
      return {
        ...detailConsolidateHistoryInitialState,
        loading: true,
      };
    },
    /** => Succeeded */
    [types.ORDER_CONSOLIDATE_HISTORY_DETAIL_SUCCESS](
      state = detailConsolidateHistoryInitialState,
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
    [types.ORDER_CONSOLIDATE_HISTORY_DETAIL_FAILED](
      state = detailConsolidateHistoryInitialState,
      { payload }: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
    /** => Refresh */
    [types.ORDER_CONSOLIDATE_HISTORY_DETAIL_REFRESH]() {
      return {
        ...detailConsolidateHistoryInitialState,
        refresh: true,
      };
    },
    /** => Reset */
    [types.ORDER_CONSOLIDATE_HISTORY_DETAIL_RESET]() {
      return detailConsolidateHistoryInitialState;
    },
  },
);
