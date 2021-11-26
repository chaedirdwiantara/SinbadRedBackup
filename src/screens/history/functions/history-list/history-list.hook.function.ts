/** === IMPORT PACKAGES === */
import { useDispatch } from 'react-redux';
/** === IMPORT INTERNAL === */
import * as Actions from '@actions';

/** === FUNCTIONS === */
export const useOrderStatusActions = () => {
  const dispatch = useDispatch();
  return {
    fetch: (contextDispatch: (action: any) => any) => {
      dispatch(Actions.orderStatusProcess(contextDispatch));
    },
    reset: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.orderStatusRefresh);
    },
  };
};

export const usePaymentStatus = () => {
  const dispatch = useDispatch();
  const data = { loading: true, limit: 0, skip: 0 };
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

/** => List */
const callProcessAction = (
  contextDispatch: (action: any) => any,
  loading: boolean,
  skip: number,
  limit: number,
) => {
  return Actions.historyListProcess(contextDispatch, {
    loading,
    skip,
    limit,
  });
};
export const useHistoryListActions = () => {
  const dispatch = useDispatch();
  const limit = 10;

  return {
    fetch: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.historyListReset());
      dispatch(callProcessAction(contextDispatch, true, 0, limit));
    },
    refresh: (contextDispatch: (action: any) => any) => {
      contextDispatch(Actions.historyListRefresh());
      dispatch(callProcessAction(contextDispatch, true, 0, limit));
    },
    loadMore: (
      contextDispatch: (action: any) => any,
      paginationQueris: { skip: number; canLoadMore: boolean },
    ) => {
      if (paginationQueris.canLoadMore) {
        contextDispatch(Actions.historyListLoadMore());
        dispatch(
          callProcessAction(
            contextDispatch,
            false,
            paginationQueris.skip + limit,
            limit,
          ),
        );
      }
    },
  };
};
