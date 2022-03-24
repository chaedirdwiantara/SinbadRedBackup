import { useCallback } from 'react';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { useHistoryTrackingDetailActions } from './use-history-detail-hook';
import { useGetNavParams } from '@core/functions/navigation/navigation-hook.function';

export const useDetailHistoryOrder = () => {
  const {
    params: { id },
  } = useGetNavParams();
  const { dispatchOrderHistory } = useOrderHistoryContext();
  const { fetch, reset } = useHistoryTrackingDetailActions();

  const get = useCallback(() => {
    fetch(dispatchOrderHistory, { id });
  }, [id]);

  const clear = useCallback(() => {
    reset(dispatchOrderHistory);
  }, []);

  return { get, clear };
};
