import React, { FC, useReducer, useMemo } from 'react';

import {
  HistoryContext,
  orderStatusHistoryReducer,
  OrderStatusInitialState,
} from './order-status.context';

const HistoryProvider: FC = ({ children }) => {
  const [stateOrderStatus, dispatchOrderStatus] = useReducer(
    orderStatusHistoryReducer,
    OrderStatusInitialState,
  );
  const contextValue = useMemo(
    () => ({
      stateOrderStatus,
      dispatchOrderStatus,
    }),
    [stateOrderStatus, dispatchOrderStatus],
  );
  return (
    <HistoryContext.Provider value={contextValue}>
      {children}
    </HistoryContext.Provider>
  );
};

export { HistoryProvider, HistoryContext };
