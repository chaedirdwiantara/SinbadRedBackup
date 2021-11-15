import { createContext, Dispatch } from 'react';

import {
  OrderStatusInitialState,
  OrderStatusState,
  orderStatusHistoryReducer,
} from '@reducer/history/history.reducer';

const HistoryContext = createContext<{
  stateOrderStatus: OrderStatusState;
  dispatchOrderStatus: Dispatch<any>;
}>({
  stateOrderStatus: OrderStatusInitialState,
  dispatchOrderStatus: () => null,
});

export { HistoryContext, orderStatusHistoryReducer, OrderStatusInitialState };
