import React, { FC, useReducer, useMemo } from 'react';

import {
  OrderHistoryContext,
  orderHistoryReducer,
  orderHistoryInitialState,
} from './order-history.context';

const OrderHistoryProvider: FC = ({ children }) => {
  const [stateOrderHistory, dispatchOrderHistory] = useReducer(
    orderHistoryReducer,
    orderHistoryInitialState,
  );
  const contextValue = useMemo(
    () => ({
      stateOrderHistory,
      dispatchOrderHistory,
    }),
    [stateOrderHistory, dispatchOrderHistory],
  );

  return (
    <OrderHistoryContext.Provider value={contextValue}>
      {children}
    </OrderHistoryContext.Provider>
  );
};

export { OrderHistoryProvider, OrderHistoryContext };
