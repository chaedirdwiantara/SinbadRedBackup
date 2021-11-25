/** === IMPORT INTERNAL === */
import {
  OrderStatusInitialProps,
  orderStatusInitialState,
  orderStatusReducer,
} from './list-history/order-status.reducer';

import {
  paymentStatusListReducer,
  paymentStatusListInitialState,
  PaymentStatusListInitialProps
} from './list-history/payment-status-list.reducer';

export interface HistoryListState {
  orderStatus: OrderStatusInitialProps;
  paymentStatus: PaymentStatusListInitialProps;
}

/** === INITIAL STATE === */
export const historyInitialState = {
  paymentStatus: paymentStatusListInitialState,
  orderStatus: orderStatusInitialState,
};
/** === EXPORT ALL HERE === */
export const historyReducer = (
  { paymentStatus, orderStatus }: HistoryListState,
  action: any,
) => ({
  paymentStatus: paymentStatusListReducer(paymentStatus, action),
  orderStatus: orderStatusReducer(orderStatus, action),
});
