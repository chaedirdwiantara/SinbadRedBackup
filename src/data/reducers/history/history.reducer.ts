/** === IMPORT INTERNAL === */
import {
  historyListInitialState,
  HistoryListInitialProps,
  historyListReducer,
} from './list-history/history-list.reducer';
import {
  OrderStatusInitialProps,
  orderStatusInitialState,
  orderStatusReducer,
} from './list-history/order-status.reducer';
import {
  paymentStatusListReducer,
  paymentStatusListInitialState,
  PaymentStatusListInitialProps,
} from './list-history/payment-status-list.reducer';
import {
  PaymentDetailInitialProps,
  paymentDetailInitialState,
  paymentDetailReducer,
} from './detail/payment-detail.reducer';
import {
  paymentInvoiceInitialState,
  PaymentInvoiceInitialProps,
  paymentInvoiceReducer,
} from './payment-invoice.reducer';
import {
  historyDetailInitialState,
  HistoryDetailInitialProps,
  historyDetailReducer,
} from './detail/history-detail.reducer';
/** === TYPE === */
export interface HistoryState {
  list: HistoryListInitialProps;
  detail: HistoryDetailInitialProps;
  orderStatus: OrderStatusInitialProps;
  paymentStatus: PaymentStatusListInitialProps;
  paymentDetail: PaymentDetailInitialProps;
  paymentInvoice: PaymentInvoiceInitialProps;
}
/** === INITIAL STATE === */
export const historyInitialState = {
  list: historyListInitialState,
  detail: historyDetailInitialState,
  orderStatus: orderStatusInitialState,
  paymentStatus: paymentStatusListInitialState,
  paymentDetail: paymentDetailInitialState,
  paymentInvoice: paymentInvoiceInitialState,
};
/** === REDUCER === */
export const historyReducer = (
  {
    list,
    detail,
    orderStatus,
    paymentStatus,
    paymentDetail,
    paymentInvoice,
  }: HistoryState,
  action: any,
) => ({
  list: historyListReducer(list, action),
  detail: historyDetailReducer(detail, action),
  orderStatus: orderStatusReducer(orderStatus, action),
  paymentStatus: paymentStatusListReducer(paymentStatus, action),
  paymentDetail: paymentDetailReducer(paymentDetail, action),
  paymentInvoice: paymentInvoiceReducer(paymentInvoice, action),
});
