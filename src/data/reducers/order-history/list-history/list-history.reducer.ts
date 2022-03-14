/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type ListHistoryProps = models.ListItemProps<
  Array<models.OrderListHistory>
>;
/** === INITIAL STATE === */
export const listHistoryInitialState: ListHistoryProps = {
  data: [],
  loading: false,
  loadMore: false,
  refresh: false,
  error: null,
  total: 0,
  skip: 0,
};
/** === REDUCER == */
export const listHistoryReducer = simplifyReducer(listHistoryInitialState, {
  /** => Process */
  [types.ORDER_HISTORY_LIST_PROCESS](
    state = listHistoryInitialState,
    { payload }: models.ListProcessAction,
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
    { payload }: models.ListSuccessAction<Array<models.OrderParcels>>,
  ) {
    return {
      ...state,
      data: [...state.data, ...payload.data],
      loading: false,
      loadMore: false,
      refresh: false,
      error: null,
      total: payload.meta.total,
      skip: payload.meta.skip,
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
