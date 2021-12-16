/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type HistoryListInitialProps = models.ListItemProps<
  Array<models.OrderParcels>
>;
/** === INITIAL STATE === */
export const historyListInitialState: HistoryListInitialProps = {
  data: [],
  loading: false,
  loadMore: false,
  refresh: false,
  error: null,
  total: 0,
  skip: 0,
};
/** === REDUCER == */
export const historyListReducer = simplifyReducer(historyListInitialState, {
  /** => Process */
  [types.HISTORY_LIST_PROCESS](
    state = historyListInitialState,
    { payload }: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: payload.loading,
      error: null,
    };
  },
  /** => Succeeded */
  [types.HISTORY_LIST_SUCCESS](
    state = historyListInitialState,
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
  [types.HISTORY_LIST_FAILED](
    state = historyListInitialState,
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
  [types.HISTORY_LIST_REFRESH]() {
    return {
      ...historyListInitialState,
      refresh: true,
    };
  },
  /** => Load More */
  [types.HISTORY_LIST_LOADMORE](state = historyListInitialState) {
    return {
      ...state,
      loadMore: true,
    };
  },
  /** => Reset */
  [types.HISTORY_LIST_RESET]() {
    return historyListInitialState;
  },
});
