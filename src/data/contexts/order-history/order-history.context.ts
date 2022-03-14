import { createContext, Dispatch } from 'react';

import {
  OrderHistoryState,
  orderHistoryInitialState,
  orderHistoryReducer,
} from '@reducer/order-history/order-history.reducer';

const OrderHistoryContext = createContext<{
  stateOrderHistory: OrderHistoryState;
  dispatchOrderHistory: Dispatch<any>;
}>({
  stateOrderHistory: orderHistoryInitialState,
  dispatchOrderHistory: () => null,
});

export { OrderHistoryContext, orderHistoryReducer, orderHistoryInitialState };
