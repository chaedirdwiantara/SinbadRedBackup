import { createContext, Dispatch } from 'react';

import {
  reserveStockInitialState,
  reserveStockReducer,
  ReserveStockInitialProps,
} from '@reducer/product/reserve-stock/reserve-stock.reducer';

const ReserveStockContext = createContext<{
  stateReserveStock: ReserveStockInitialProps;
  dispatchReserveStock: Dispatch<any>;
}>({
  stateReserveStock: reserveStockInitialState,
  dispatchReserveStock: () => null,
});

export { ReserveStockContext, reserveStockReducer, reserveStockInitialState };
