/** === IMPORT INTERNAL === */
import {
  OrderStatusInitialProps,
  orderStatusInitialState,
  orderStatusReducer,
} from './list-history/order-status.reducer';

import {
  paymentStatusListReducer,
  paymentStatusListInitialState,
} from './list-history/payment-status-list.reducer';

import {
  HistoryListInitialProps,
  historyListInitialState,
  historyListReducer,
} from './list-history/history-list.reducer';

export interface HistoryListState {
  orderStatus: OrderStatusInitialProps;
  paymentStatus: any;
  list: HistoryListInitialProps;
}

/** === INITIAL STATE === */
export const historyInitialState = {
  paymentStatus: paymentStatusListInitialState,
  orderStatus: orderStatusInitialState,
  list: historyListInitialState,
};
/** === EXPORT ALL HERE === */
export const historyReducer = (
  { paymentStatus, orderStatus, list }: HistoryListState,
  action: any,
) => ({
  paymentStatus: paymentStatusListReducer(paymentStatus, action),
  orderStatus: orderStatusReducer(orderStatus, action),
  list: historyListReducer(list, action),
});
