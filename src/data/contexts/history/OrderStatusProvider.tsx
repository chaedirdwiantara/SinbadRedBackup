import React, { FC, useReducer, useMemo } from 'react';

import {
  OrderStatusContext,
  orderStatusHistoryReducer,
  OrderStatusInitialState,
} from './order-status.context';

const OrderStatusProvider: FC = ({ children }) => {
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
    <OrderStatusContext.Provider value={contextValue}>
      {children}
    </OrderStatusContext.Provider>
  );
};

export { OrderStatusProvider, OrderStatusContext };
