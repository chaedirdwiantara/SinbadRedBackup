import { useContext } from 'react';

import { StockContext } from './stock.context';

export const useStockContext = () => {
  const context = useContext(StockContext);

  if (context === undefined) {
    throw new Error('useStockContext was used outside of StockProvider');
  }

  return context;
};
