/** === IMPORT INTERNAL === */
import {
  OrderStatusInitialProps,
  orderStatusInitialState,
  orderStatusReducer,
} from './order-status.reducer';

import {
  paymentStatusListReducer,
  paymentStatusListInitialState,
} from './list-history/payment-status-list.reducer';
export interface OrderStatusState {
  orderStatus: OrderStatusInitialProps;
}

export const OrderStatusInitialState = {
  orderStatus: orderStatusInitialState,
};

export const orderStatusHistoryReducer = (
  { orderStatus }: OrderStatusState,
  action: any,
) => ({
  orderStatus: orderStatusReducer(orderStatus, action),
});

/** === INITIAL STATE === */
export const historyInitialState = {
  paymentStatus: paymentStatusListInitialState,
};
/** === EXPORT ALL HERE === */
export const historyReducer = ({ paymentStatus }: any, action: any) => ({
  paymentStatus: paymentStatusListReducer(paymentStatus, action),
});
