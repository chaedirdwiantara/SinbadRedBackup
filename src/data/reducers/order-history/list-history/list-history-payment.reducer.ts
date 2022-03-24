/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type ListHistoryPaymentProps = models.ListItemV3Props<
  Array<models.WaitingPaymentListHistory>
>;
/** === INITIAL STATE === */
export const listHistoryPaymentInitialState: ListHistoryPaymentProps = {
  data: [],
  loading: false,
  loadMore: false,
  refresh: false,
  error: null,
  totalPage: 0,
  page: 0,
  perPage: 10,
};
/** === REDUCER == */
export const listHistoryPaymentReducer = simplifyReducer(listHistoryPaymentInitialState, {
  /** => Process */
  [types.ORDER_HISTORY_LIST_PAYMENT_PROCESS](
    state = listHistoryPaymentInitialState,
    { payload }: models.ListProcessV3Action,
  ) {
    return {
      ...state,
      loading: payload.loading,
      error: null,
    };
  },
  /** => Succeeded */
  [types.ORDER_HISTORY_LIST_PAYMENT_SUCCESS](
    state = listHistoryPaymentInitialState,
    { payload }: models.ListSuccessV3Action<Array<models.WaitingPaymentListHistory>>,
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
    state = listHistoryPaymentInitialState,
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
      ...listHistoryPaymentInitialState,
      refresh: true,
    };
  },
  /** => Load More */
  [types.ORDER_HISTORY_LIST_LOADMORE](state = listHistoryPaymentInitialState) {
    return {
      ...state,
      loadMore: true,
    };
  },
  /** => Reset */
  [types.ORDER_HISTORY_LIST_RESET]() {
    return listHistoryPaymentInitialState;
  },
});
