import { useContext } from 'react';

import { OrderStatusContext } from './order-status.context';

export const useOrderStatusContext = () => {
  const context = useContext(OrderStatusContext);

  if (context === undefined) {
    throw new Error(
      'userOrderStatusContext was used outside of HistoryProvider',
    );
  }

  return context;
};
