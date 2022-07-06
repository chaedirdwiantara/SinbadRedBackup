/** === IMPORT PACKAGE === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTIONS === */
const callProcessAction = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  page: number,
  perPage: number,
  queryOptions?: models.OrderListHistoryQueryOptions,
) => {
  return Actions.orderHistoryListProcess(contextDispatch, {
    loading,
    page,
    perPage,
    ...queryOptions,
  });
};
const callProcessActionConsolidate = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  page: number,
  perPage: number,
  queryOptions?: models.ConsolidateOrderListHistoryQueryOptions,
) => {
  return Actions.consolidateOrderHistoryListProcess(contextDispatch, {
    loading,
    page,
    perPage,
    ...queryOptions,
  });
};

const callProcessActionPayment = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  page: number,
  perPage: number,
  queryOptions?: models.OrderListHistoryQueryOptions,
) => {
  return Actions.orderHistoryListPaymentProcess(contextDispatch, {
    loading,
    page,
    perPage,
    ...queryOptions,
  });
};
export const useMenuStatusListAction = () => {
  const dispatch = useDispatch();
  return {
    menuStatusList: (
      contextDispatch: (action: any) => any,
    ) => {
      dispatch(Actions.menuStatusListProcess(contextDispatch))
    }
  }
}
export const useConsolidateHistoryListActions = () => {
  const dispatch = useDispatch();
  const perPage = 10;
  const page = 1;
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.ConsolidateOrderListHistoryQueryOptions,
    ) => {
      contextDispatch(Actions.consolidateOrderHistoryListReset());
      dispatch(
        callProcessActionConsolidate(contextDispatch, true, page, perPage, queryOptions),
      );
    },
    refresh: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.ConsolidateOrderListHistoryQueryOptions,
    ) => {
      contextDispatch(Actions.consolidateOrderHistoryListRefresh());
      dispatch(
        callProcessActionConsolidate(contextDispatch, true, page, perPage, queryOptions),
      );
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.consolidateOrderHistoryListReset());
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      state: models.ListItemV3Props<Array<models.ConsolidateOrderListHistory>>,
      queryOptions?: models.ConsolidateOrderListHistoryQueryOptions,
    ) => {
      if (state.page < state.totalPage) {
        contextDispatch(Actions.consolidateOrderHistoryListLoadMore());
        dispatch(
          callProcessAction(
            contextDispatch,
            false,
            state.page + 1,
            perPage,
            queryOptions,
          ),
        );
      }
    },
  };
};
export const useHistoryListActions = () => {
  const dispatch = useDispatch();
  const perPage = 10;
  const page = 1;
  return {
    fetch: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.OrderListHistoryQueryOptions,
    ) => {
      contextDispatch(Actions.orderHistoryListReset());
      dispatch(
        callProcessAction(contextDispatch, true, page, perPage, queryOptions),
      );
    },
    refresh: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.OrderListHistoryQueryOptions,
    ) => {
      contextDispatch(Actions.orderHistoryListRefresh());
      dispatch(
        callProcessAction(contextDispatch, true, page, perPage, queryOptions),
      );
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.orderHistoryListReset());
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      state: models.ListItemV3Props<Array<models.OrderListHistory>>,
      queryOptions?: models.OrderListHistoryQueryOptions,
    ) => {
      if (state.page < state.totalPage) {
        contextDispatch(Actions.orderHistoryListLoadMore());
        dispatch(
          callProcessAction(
            contextDispatch,
            false,
            state.page + 1,
            perPage,
            queryOptions,
          ),
        );
      }
    },
  };
};

export const useHistoryListPaymentActions = () => {
  const dispatch = useDispatch();
  const perPage = 10;
  const page = 1;

  return {
    fetchWaitingPayment: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.PaymentListHistoryQueryOptions,
    ) => {
      contextDispatch(Actions.orderHistoryListPaymentReset());
      dispatch(callProcessActionPayment(contextDispatch, true, page, perPage, queryOptions));
    },
    refreshWaitingPayment: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.PaymentListHistoryQueryOptions,
    ) => {
      contextDispatch(Actions.orderHistoryListPaymentRefresh());
      dispatch(callProcessActionPayment(contextDispatch, true, page, perPage, queryOptions));
    },
    resetWaitingPayment: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.orderHistoryListPaymentReset());
    },
    loadMoreWaitingPayment: (
      contextDispatch: (action: any) => any,
      state: models.ListItemV3Props<Array<models.WaitingPaymentListHistory>>,
      queryOptions?: models.PaymentListHistoryQueryOptions,
    ) => {
      if (state.page < state.totalPage) {
        contextDispatch(Actions.orderHistoryListPaymentLoadMore());
        dispatch(
          callProcessActionPayment(
            contextDispatch,
            false,
            state.page + 1,
            perPage,
            queryOptions,
          ),
        );
      }
    },
  };
};
