/** === IMPORT PACKAGE === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTIONS === */
const callProcessAction = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  skip: number,
  limit: number,
  queryOptions?: models.HistoryListQueryOptions,
) => {
  return Actions.historyListProcess(contextDispatch, {
    loading,
    skip,
    limit,
    ...queryOptions,
  });
};

export const useOrderStatusActions = () => {
  const dispatch = useDispatch();

  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(
        Actions.orderStatusProcess(contextDispatch, {
          loading: true,
          limit: 0,
          skip: 0,
        }),
      );
    },
  };
};

export const usePaymentStatus = () => {
  const dispatch = useDispatch();

  return {
    list: (contextDispatch: (action: any) => any) => {
      dispatch(
        Actions.paymentStatusListProcess(contextDispatch, {
          loading: true,
          limit: 0,
          skip: 0,
        }),
      );
    },
  };
};

export const useHistoryListActions = () => {
  const dispatch = useDispatch();
  const limit = 10;

  return {
    fetch: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.HistoryListQueryOptions,
    ) => {
      contextDispatch(Actions.historyListReset());
      dispatch(
        callProcessAction(contextDispatch, true, 0, limit, queryOptions),
      );
    },
    refresh: (
      contextDispatch: (action: any) => any,
      queryOptions?: models.HistoryListQueryOptions,
    ) => {
      contextDispatch(Actions.historyListRefresh());
      dispatch(
        callProcessAction(contextDispatch, true, 0, limit, queryOptions),
      );
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      state: models.ListItemProps<Array<models.OrderParcels>>,
      queryOptions?: models.HistoryListQueryOptions,
    ) => {
      if (state.data.length < state.total) {
        contextDispatch(Actions.historyListLoadMore());
        dispatch(
          callProcessAction(
            contextDispatch,
            false,
            state.skip + limit,
            limit,
            queryOptions,
          ),
        );
      }
    },
  };
};
