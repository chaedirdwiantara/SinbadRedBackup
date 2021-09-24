import React from 'react';
import {
  VerificationOrderInitialProps,
  verificationOrderInitialState,
  verificationOrderReducer,
} from '@reducer/oms/verification-order/verification-order.reducer';

const VerificationOrderContext = React.createContext<{
  // state: InitialStateType;
  stateVerificationOrder: VerificationOrderInitialProps;
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
