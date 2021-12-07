import React, { FC, useReducer, useMemo } from 'react';

import { StockContext, stockReducer, stockInitialState } from './stock.context';

const StockProvider: FC = ({ children }) => {
  const [stateStock, dispatchStock] = useReducer(
    stockReducer,
    stockInitialState,
  );
  const contextValue = useMemo(
    () => ({
      stateStock,
      dispatchStock,
    }),
    [stateStock, dispatchStock],
  );

  return (
    <StockContext.Provider value={contextValue}>
      {children}
    </StockContext.Provider>
  );
};

export { StockProvider, StockContext };
