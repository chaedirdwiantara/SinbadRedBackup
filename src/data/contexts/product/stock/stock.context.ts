import { createContext, Dispatch } from 'react';

import {
  StockState,
  stockInitialState,
  stockReducer,
} from '@reducer/product/stock/stock.reducer';

const StockContext = createContext<{
  stateStock: StockState;
  dispatchStock: Dispatch<any>;
}>({
  stateStock: stockInitialState,
  dispatchStock: () => null,
});

export { StockContext, stockReducer, stockInitialState };
