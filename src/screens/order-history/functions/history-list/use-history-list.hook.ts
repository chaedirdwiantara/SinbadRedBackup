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
  const page = 10;

  return {
    fetch: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.OrderListHistoryQueryOptions,
    ) => {
      contextDispatch(Actions.orderHistoryListReset());
      dispatch(callProcessAction(contextDispatch, true, 0, page, queryOptions));
    },
    refresh: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.OrderListHistoryQueryOptions,
    ) => {
      contextDispatch(Actions.orderHistoryListRefresh());
      dispatch(callProcessAction(contextDispatch, true, 0, page, queryOptions));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.orderHistoryListReset());
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      state: models.ListItemV3Props<Array<models.OrderListHistory>>,
      queryOptions?: models.OrderListHistoryQueryOptions,
    ) => {
      if (state.data.length < state.totalPage) {
        contextDispatch(Actions.orderHistoryListRefresh());
        dispatch(
          callProcessAction(
            contextDispatch,
            false,
            state.page + page,
            page,
            queryOptions,
          ),
        );
      }
    },
  };
};
