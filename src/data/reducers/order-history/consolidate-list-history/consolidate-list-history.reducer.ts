/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type ConsolidateListHistoryProps = models.ListItemV3Props<
  Array<models.ConsolidateOrderListHistory>
>;
/** === INITIAL STATE === */
export const consolidateListHistoryInitialState: ConsolidateListHistoryProps = {
  data: [],
  loading: false,
  loadMore: false,
  refresh: false,
  error: null,
  totalPage: 0,
  page: 1,
  perPage: 5,
};
/** === REDUCER == */
export const consolidateListHistoryReducer = simplifyReducer(consolidateListHistoryInitialState, {
  /** => Process */
  [types.CONSOLIDATE_ORDER_HISTORY_LIST_PROCESS](
    state = consolidateListHistoryInitialState,
    { payload }: models.ListProcessV3Action,
  ) {
    return {
      ...state,
      loading: payload.loading,
      error: null,
    };
  },
  /** => Succeeded */
  [types.CONSOLIDATE_ORDER_HISTORY_LIST_SUCCESS](
    state = consolidateListHistoryInitialState,
    { payload }: models.ListSuccessV3Action<Array<models.ConsolidateOrderListHistory>>,
  ) {
    return {
      ...state,
      data: [...state.data, ...payload.data],
      loading: false,
      loadMore: false,
      refresh: false,
      error: null,
      totalPage: payload.meta.totalPage,
      page: payload.meta.page,
      perPage: payload.meta.perPage,
    };
  },
  /** => Failed */
  [types.CONSOLIDATE_ORDER_HISTORY_LIST_FAILED](
    state = consolidateListHistoryInitialState,
    { payload }: models.ListFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      loadMore: false,
      refresh: false,
      error: payload,
    };
  },
  /** => Refresh */
  [types.CONSOLIDATE_ORDER_HISTORY_LIST_REFRESH]() {
    return {
      ...consolidateListHistoryInitialState,
      refresh: true,
    };
  },
  /** => Load More */
  [types.CONSOLIDATE_ORDER_HISTORY_LIST_LOADMORE](state = consolidateListHistoryInitialState) {
    return {
      ...state,
      loadMore: true,
    };
  },
  /** => Reset */
  [types.CONSOLIDATE_ORDER_HISTORY_LIST_RESET]() {
    return consolidateListHistoryInitialState;
  },
});
