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

import {
  PaymentDetailInitialProps,
  paymentDetailInitialState,
  paymentDetailReducer
} from './detail/payment-detail.reducer'
export interface HistoryListState {
  orderStatus: OrderStatusInitialProps;
  paymentStatus: PaymentStatusListInitialProps;
  paymentDetail: PaymentDetailInitialProps;
}

/** === INITIAL STATE === */
export const historyInitialState = {
  paymentStatus: paymentStatusListInitialState,
  orderStatus: orderStatusInitialState,
  paymentDetail: paymentDetailInitialState
};
/** === EXPORT ALL HERE === */
export const historyReducer = (
  { paymentStatus, orderStatus, paymentDetail }: HistoryListState,
  action: any,
) => ({
  paymentStatus: paymentStatusListReducer(paymentStatus, action),
  orderStatus: orderStatusReducer(orderStatus, action),
  paymentDetail: paymentDetailReducer(paymentDetail, action)
});
