/** === IMPORT INTERNAL === */
import { listHistoryPaymentInitialState, ListHistoryPaymentProps, listHistoryPaymentReducer } from './list-history/list-history-payment.reducer';
import {
  listHistoryInitialState,
  ListHistoryProps,
  listHistoryReducer,
} from './list-history/list-history.reducer';
/** === TYPE === */
export interface OrderHistoryState {
  list: ListHistoryProps;
  listWaitingPayment: ListHistoryPaymentProps
}
/** === INITIAL STATE === */
export const orderHistoryInitialState = {
  list: listHistoryInitialState,
  listWaitingPayment: listHistoryPaymentInitialState
};
/** === REDUCER === */
export const orderHistoryReducer = (
  { list, listWaitingPayment }: OrderHistoryState,
  action: any,
) => ({
  list: listHistoryReducer(list, action),
  listWaitingPayment: listHistoryPaymentReducer(listWaitingPayment, action)
});
