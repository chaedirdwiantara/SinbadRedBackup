import {
    paymentStatusListReducer,
    paymentStatusListInitialState
} from './list-history/payment-status-list.reducer';

/** === INITIAL STATE === */
export const historyInitialState = {
    paymentStatus: paymentStatusListInitialState,
}
/** === EXPORT ALL HERE === */
export const historyReducer = (
    {
      paymentStatus,
    }: any,
    action: any,
  ) => ({
    paymentStatus: paymentStatusListReducer(paymentStatus, action),
  });
  