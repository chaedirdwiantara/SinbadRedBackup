import { useContext } from 'react';

import { OrderHistoryContext } from './order-history.context';

export const useOrderHistoryContext = () => {
  const context = useContext(OrderHistoryContext);

  if (context === undefined) {
    throw new Error(
      'useOrderHistoryContext was used outside of HistoryProvider',
    );
  }

  return context;
};
