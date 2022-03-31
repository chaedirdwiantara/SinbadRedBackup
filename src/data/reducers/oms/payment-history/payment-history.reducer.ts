/** === IMPORT INTERNAL === */

import { 
  listHistoryPaymentInitialState, 
  ListHistoryPaymentProps, 
  listHistoryPaymentReducer 
} from "./payment-history-list.reducer";

/** === TYPE === */
export interface PaymentHistoryState {
  listWaitingPayment: ListHistoryPaymentProps
}
/** === INITIAL STATE === */
export const paymentHistoryInitialState = {
  listWaitingPayment: listHistoryPaymentInitialState,
};
/** === REDUCER === */
export const paymentHistoryReducer = (
  {listWaitingPayment}: PaymentHistoryState,
  action: any,
) => ({
  listWaitingPayment: listHistoryPaymentReducer(listWaitingPayment, action),
});
