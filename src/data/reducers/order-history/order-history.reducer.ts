/** === IMPORT INTERNAL === */
import { listHistoryPaymentInitialState, ListHistoryPaymentProps, listHistoryPaymentReducer } from './list-history/list-history-payment.reducer';
import {
  listHistoryInitialState,
  ListHistoryProps,
  listHistoryReducer,
} from './list-history/list-history.reducer';
import {
  DetailHistoryProps,
  detailHistoryInitialState,
  detailHistoryReducer,
} from './detail-history/detail-history.reducer';
import {
  DetailTrackingHistoryProps,
  detailTrackingHistoryInitialState,
  detailTrackingHistoryReducer,
} from './detail-tracking-history/detail-tracking-history.reducer';
/** === TYPE === */
export interface OrderHistoryState {
  list: ListHistoryProps;
  listWaitingPayment: ListHistoryPaymentProps
  detail: DetailHistoryProps;
  tracking: DetailTrackingHistoryProps;
}
/** === INITIAL STATE === */
export const orderHistoryInitialState = {
  list: listHistoryInitialState,
  listWaitingPayment: listHistoryPaymentInitialState,
  detail: detailHistoryInitialState,
  tracking: detailTrackingHistoryInitialState,
};
/** === REDUCER === */
export const orderHistoryReducer = (
  { list, listWaitingPayment,detail, tracking }: OrderHistoryState,
  action: any,
) => ({
  list: listHistoryReducer(list, action),
  listWaitingPayment: listHistoryPaymentReducer(listWaitingPayment, action),
  detail: detailHistoryReducer(detail, action),
  tracking: detailTrackingHistoryReducer(tracking, action),
});
