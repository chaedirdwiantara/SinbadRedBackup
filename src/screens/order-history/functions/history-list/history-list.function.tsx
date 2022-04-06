import { useEffect, useContext, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { HistoryListContext } from '../../components/order-history-list';
import { useHistoryListActions } from './use-history-list.hook';
// type
import * as models from '@models';

export const useInitialGetList = () => {
  const [state] = useContext(HistoryListContext.Context);
  const { dispatchOrderHistory } = useOrderHistoryContext();
  const { fetch, reset } = useHistoryListActions();

  useFocusEffect(
    useCallback(() => {
      // list history
      // get & reload by filter
      const { keyword, orderStatus, status } = state;
      if (status === 'waiting_for_payment') {
        reset(dispatchOrderHistory);
      } else {
        fetch(dispatchOrderHistory, { orderStatus, status, keyword });
      }
    }, [state.keyword, state.orderStatus, state.status]),
  );
};

export const useHistoryListFunction = () => {
  const [state] = useContext(HistoryListContext.Context);
  const {
    dispatchOrderHistory,
    stateOrderHistory: { list },
  } = useOrderHistoryContext();
  const { loadMore, refresh } = useHistoryListActions();

  const derivedQueryOptions = useMemo<models.OrderListHistoryQueryOptions>(
    () => ({
      keyword: state.keyword,
      orderStatus: state.orderStatus,
      status: state.status,
    }),
    [state.keyword, state.orderStatus, state.status],
  );

  const onLoadMore = useCallback(() => {
    loadMore(dispatchOrderHistory, list, derivedQueryOptions);
  }, [derivedQueryOptions, list]);

  const onRefresh = useCallback(() => {
    refresh(dispatchOrderHistory, derivedQueryOptions);
  }, [derivedQueryOptions]);

  return { onLoadMore, refresh, onRefresh };
};
