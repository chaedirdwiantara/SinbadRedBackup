import { useContext } from 'react';

import { ReserveStockContext } from './reserve-stock.context';

export const useReserveStockContext = () => {
  const context = useContext(ReserveStockContext);

  if (context === undefined) {
    throw new Error(
      'useReserveStockContext was used outside of ReserveStockProvider',
    );
  }

  return context;
};
