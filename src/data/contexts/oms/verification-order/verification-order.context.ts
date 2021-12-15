import React from 'react';
import {
  VerificationOrderState,
  verificationOrderInitialState,
  verificationOrderReducer,
} from '@reducer/oms/verification-order/verification-order.reducer';

const VerificationOrderContext = React.createContext<{
  // state: InitialStateType;
  stateVerificationOrder: VerificationOrderState;
  dispatchVerificationOrder: React.Dispatch<any>;
}>({
  // state: initialState,
  stateVerificationOrder: verificationOrderInitialState,
  dispatchVerificationOrder: () => null,
});

export {
  VerificationOrderContext,
  verificationOrderReducer,
  verificationOrderInitialState,
};
