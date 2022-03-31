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
