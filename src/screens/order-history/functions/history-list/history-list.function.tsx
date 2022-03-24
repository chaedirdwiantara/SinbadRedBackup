import { useEffect, useContext, useCallback } from 'react';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { HistoryListContext } from '../../components/order-history-list';
import { useHistoryListActions, useHistoryListPaymentActions } from './use-history-list.hook';
import { NavigationAction } from '@navigation';
// type
import * as models from '@models';

export const useInitialGetList = () => {
  const [state] = useContext(HistoryListContext.Context);
  const { dispatchOrderHistory } = useOrderHistoryContext();
  const { fetch, reset } = useHistoryListActions();
  const { fetchWaitingPayment, resetWaitingPayment } = useHistoryListPaymentActions();

  useEffect(() => {
    // list history
    // get & reload by filter
    const { keyword, orderStatus, status } = state;
    if (status === 'waiting_for_payment') {
      resetWaitingPayment(dispatchOrderHistory);
      fetchWaitingPayment(dispatchOrderHistory, 
        { 
          orderStatus: '', 
          status, 
          keyword: '' 
        });
    } else {
      fetch(dispatchOrderHistory, { orderStatus, status, keyword });
    }
  }, [state.keyword, state.orderStatus, state.status]);
};

export const useHistoryListFunction = () => {
  const [state] = useContext(HistoryListContext.Context);
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
  }, [state.keyword, state.orderStatus, state.status, list]);

  return { onLoadMore };
};

export const useHistoryListPaymentFunction = () => {
  const [state] = useContext(HistoryListContext.Context);
  const {
    dispatchOrderHistory,
    stateOrderHistory: { listWaitingPayment },
  } = useOrderHistoryContext();
  const { loadMoreWaitingPayment } = useHistoryListPaymentActions();

  const onLoadMorePayment = useCallback(() => {
    const derivedQueryOptions: models.OrderListHistoryQueryOptions = {
      keyword: state.keyword,
      orderStatus: state.orderStatus,
      status: state.status,
    };

    loadMoreWaitingPayment(dispatchOrderHistory, listWaitingPayment, derivedQueryOptions);
  }, [state.keyword, state.orderStatus, state.status, listWaitingPayment]);

  return { onLoadMorePayment };
};

/** => Go to Waiting for Payment History Detail */
export const goToWaitingPaymentHistoryDetail = (
  section: string,
  orderId: number
) => {
  NavigationAction.navigate('OmsThankYouPageView', {section, orderId});
};
