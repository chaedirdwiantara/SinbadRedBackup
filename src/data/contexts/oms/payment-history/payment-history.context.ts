import { 
  paymentHistoryInitialState, 
  PaymentHistoryState, 
  paymentHistoryReducer 
} from '@reducer/oms';
import { createContext, Dispatch } from 'react';

const PaymentHistoryContext = createContext<{
  statePaymentHistory: PaymentHistoryState;
  dispatchPaymentHistory: Dispatch<any>;
}>({
  statePaymentHistory: paymentHistoryInitialState,
  dispatchPaymentHistory: () => null,
});

export { PaymentHistoryContext, paymentHistoryReducer, paymentHistoryInitialState };
