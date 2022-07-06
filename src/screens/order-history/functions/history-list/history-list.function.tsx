import { useEffect, useContext, useCallback, useMemo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { HistoryListContext } from '../../components/order-history-list';
import { useHistoryListActions, useHistoryListPaymentActions, useConsolidateHistoryListActions } from './use-history-list.hook';
import { NavigationAction } from '@navigation';
// type
import * as models from '@models';
import { usePaymentHistoryContext } from 'src/data/contexts/oms/payment-history/usePaymentHistoryContext';

export const useInitialGetList = () => {
  const [state] = useContext(HistoryListContext.Context);
  const { dispatchOrderHistory } = useOrderHistoryContext();
  const { dispatchPaymentHistory } = usePaymentHistoryContext();
  const { fetch, reset } = useConsolidateHistoryListActions();
  const { fetchWaitingPayment, resetWaitingPayment } = useHistoryListPaymentActions();

  useFocusEffect(
    useCallback(() => {
      // list history
      // get & reload by filter
      const { keyword, orderGroupStatus, subOrderGroupStatus, status } = state;
      if (orderGroupStatus === 'waiting_for_payment') {
        fetchWaitingPayment(dispatchPaymentHistory, 
          { 
            sort: 'desc',
            sortBy: 'id'
          });
      } else {
        fetch(dispatchOrderHistory, { subOrderGroupStatus, orderGroupStatus, status, keyword });
      }
    }, [state.keyword, state.orderGroupStatus, state.subOrderGroupStatus, state.status]),
  );
};

//deprecated
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

export const useConsolidateHistoryListFunction = () => {
  const [state] = useContext(HistoryListContext.Context);
  const {
    dispatchOrderHistory,
    stateOrderHistory: { consolidateList },
  } = useOrderHistoryContext();
  const { loadMore, refresh } = useConsolidateHistoryListActions();

  const derivedQueryOptions = useMemo<models.ConsolidateOrderListHistoryQueryOptions>(
    () => ({
      keyword: state.keyword,
      orderGroupStatus: state.orderGroupStatus,
      subOrderGroupStatus: state.subOrderGroupStatus,
      status: state.status,
    }),
    [state.keyword, state.orderGroupStatus, state.subOrderGroupStatus, state.status],
  );

  const onLoadMore = useCallback(() => {
    loadMore(dispatchOrderHistory, consolidateList, derivedQueryOptions);
  }, [derivedQueryOptions, consolidateList]);

  const onRefresh = useCallback(() => {
    refresh(dispatchOrderHistory, derivedQueryOptions);
  }, [derivedQueryOptions]);

  return { onLoadMore, refresh, onRefresh };
};

export const useHistoryListPaymentFunction = () => {
  const [state] = useContext(HistoryListContext.Context);
  const {
    dispatchPaymentHistory,
    statePaymentHistory: { listWaitingPayment },
  } = usePaymentHistoryContext();
  const { loadMoreWaitingPayment, refreshWaitingPayment } = useHistoryListPaymentActions();
  
  const derivedQueryOptions = useMemo<models.PaymentListHistoryQueryOptions>(
    () => ({
      keyword: state.keyword,
      orderStatus: state.orderStatus,
      status: state.status,
      sort: 'desc',
      sortBy: 'id'
    }),
    [state.keyword, state.orderStatus, state.status],
  );

  const onLoadMorePayment = useCallback(() => {
    loadMoreWaitingPayment(dispatchPaymentHistory, listWaitingPayment, derivedQueryOptions);
  }, [state.keyword, state.orderStatus, state.status, listWaitingPayment]);

  const onRefreshPayment = useCallback(() => {
    refreshWaitingPayment(dispatchPaymentHistory, derivedQueryOptions);
  }, [derivedQueryOptions]);
  return { onLoadMorePayment, refreshWaitingPayment, onRefreshPayment };
};

/** => Go to Waiting for Payment History Detail */
export const goToWaitingPaymentHistoryDetail = (
  section: string,
  orderId: number,
) => {
  NavigationAction.navigate('OmsThankYouPageView', { section, orderId });
};
