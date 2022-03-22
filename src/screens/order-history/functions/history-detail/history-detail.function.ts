import { useCallback } from 'react';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { useHistoryDetailActions } from './use-history-detail.hook';
import { useGetNavParams } from '@core/functions/navigation/navigation-hook.function';

type UpdateOrder = {
  id: string;
  type: 'list' | 'detail';
  keyword?: string;
  status?: string;
  orderStatus?: string;
};

export const useDetailHistoryOrder = () => {
  const { params } = useGetNavParams();
  const { dispatchOrderHistory } = useOrderHistoryContext();
  const { fetch, cancel, done } = useHistoryDetailActions();

  const get = useCallback(() => {
    fetch(dispatchOrderHistory, { id: params?.id });
  }, [params?.id]);

  const cancelOrder = useCallback((data: UpdateOrder) => {
    cancel(dispatchOrderHistory, data);
  }, []);

  const doneOrder = useCallback((data: UpdateOrder) => {
    done(dispatchOrderHistory, data);
  }, []);

  return { get, doneOrder, cancelOrder };
};
