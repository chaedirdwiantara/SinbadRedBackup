import { useEffect, useContext, useCallback } from 'react';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { HistoryListContext } from '../../components/order-history-list';
import { useHistoryListActions } from './use-history-list.hook';
// type
import * as models from '@models';

const { Context } = HistoryListContext;

export const useInitialGetList = () => {
  const [state] = useContext(Context);
  const { dispatchOrderHistory } = useOrderHistoryContext();
  const { fetch, reset } = useHistoryListActions();

  useEffect(() => {
    // list history
    // get & reload by filter
    const { keyword, orderStatus, status } = state;
    if (status === 'waiting_for_payment') {
      reset(dispatchOrderHistory);
    } else {
      fetch(dispatchOrderHistory, { orderStatus, status, keyword });
    }
  }, [state.keyword, state.orderStatus, state.status]);
};

export const useHistoryListFunction = () => {
  const [state] = useContext(Context);
  const {
    dispatchOrderHistory,
    stateOrderHistory: { list },
  } = useOrderHistoryContext();
  const { loadMore } = useHistoryListActions();

  const onLoadMore = useCallback(() => {
    const derivedQueryOptions: models.OrderListHistoryQueryOptions = {
      keyword: state.keyword,
      orderStatus: state.orderStatus,
      status: state.status,
    };
    loadMore(dispatchOrderHistory, list, derivedQueryOptions);
  }, [state.keyword, state.orderStatus, state.status]);

  return { onLoadMore };
};
