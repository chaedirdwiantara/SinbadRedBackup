import { useCallback } from 'react';
import { useOrderHistoryContext } from 'src/data/contexts/order-history/useOrderHistoryContext';
import { useHistoryDetailActions } from './use-history-detail.hook';
import { useGetNavParams } from '@core/functions/navigation/navigation-hook.function';

export const useDetailHistoryOrder = () => {
  const {
    params: { id },
  } = useGetNavParams();
  const { dispatchOrderHistory } = useOrderHistoryContext();
  const { fetch } = useHistoryDetailActions();

  const get = useCallback(() => {
    fetch(dispatchOrderHistory, { id });
  }, [id]);

  return { get };
};
