/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type ListHistoryProps = models.ListItemV3Props<
  Array<models.OrderListHistory>
>;
/** === INITIAL STATE === */
export const listHistoryInitialState: ListHistoryProps = {
  data: [],
  loading: false,
  loadMore: false,
  refresh: false,
  error: null,
  totalPage: 0,
  page: 1,
  perPage: 10,
};
/** === REDUCER == */
export const listHistoryReducer = simplifyReducer(listHistoryInitialState, {
  /** => Process */
  [types.ORDER_HISTORY_LIST_PROCESS](
    state = listHistoryInitialState,
    { payload }: models.ListProcessV3Action,
  ) {
    return {
      ...state,
      loading: payload.loading,
      error: null,
    };
  },
  /** => Succeeded */
  [types.ORDER_HISTORY_LIST_SUCCESS](
    state = listHistoryInitialState,
    { payload }: models.ListSuccessV3Action<Array<models.OrderListHistory>>,
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
  [types.ORDER_HISTORY_LIST_FAILED](
    state = listHistoryInitialState,
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
  [types.ORDER_HISTORY_LIST_REFRESH]() {
    return {
      ...listHistoryInitialState,
      refresh: true,
    };
  },
  /** => Load More */
  [types.ORDER_HISTORY_LIST_LOADMORE](state = listHistoryInitialState) {
    return {
      ...state,
      loadMore: true,
    };
  },
  /** => Reset */
  [types.ORDER_HISTORY_LIST_RESET]() {
    return listHistoryInitialState;
  },
});
