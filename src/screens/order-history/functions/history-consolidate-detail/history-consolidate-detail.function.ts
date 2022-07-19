import { useCallback } from 'react';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { useHistoryConsolidateDetailActions } from './use-history-consolidate-detail.hook';
import { useGetNavParams } from '@core/functions/navigation/navigation-hook.function';

type UpdateOrder = {
  id: string;
  type: 'list' | 'detail' | 'detail_consolidate';
  keyword?: string;
  status?: string;
  orderStatus?: string;
  orderId?: string;
};

export const useConsolidateDetailHistoryOrder = () => {
  const {
    stateOrderHistory: {
      consolidateDetail: { data },
    },
  } = useOrderHistoryContext();

  const { params } = useGetNavParams();
  const { dispatchOrderHistory } = useOrderHistoryContext();
  const { fetch, cancel, done, reset } = useHistoryConsolidateDetailActions();

  const get = useCallback(() => {
    fetch(dispatchOrderHistory, { id: params?.id });
  }, [params?.id]);

  const cancelOrder = useCallback((data: UpdateOrder) => {
    cancel(dispatchOrderHistory, data);
  }, []);

  const doneOrder = useCallback((data: UpdateOrder) => {
    done(dispatchOrderHistory, data);
  }, []);

  const clear = useCallback(() => {
    reset(dispatchOrderHistory);
  }, []);

  return { get, doneOrder, cancelOrder, clear };
};
