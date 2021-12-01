import React, { FC, useReducer, useMemo } from 'react';

import {
  ReserveStockContext,
  reserveStockReducer,
  reserveStockInitialState,
} from './reserve-stock.context';

const ReserveStockProvider: FC = ({ children }) => {
  const [stateReserveStock, dispatchReserveStock] = useReducer(
    reserveStockReducer,
    reserveStockInitialState,
  );
  const contextValue = useMemo(
    () => ({
      stateReserveStock,
      dispatchReserveStock,
    }),
    [stateReserveStock, dispatchReserveStock],
  );

  return (
    <ReserveStockContext.Provider value={contextValue}>
      {children}
    </ReserveStockContext.Provider>
  );
};

export { ReserveStockProvider, ReserveStockContext };
