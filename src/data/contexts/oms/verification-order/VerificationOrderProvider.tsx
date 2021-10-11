import React from 'react';
import {
  VerificationOrderContext,
  verificationOrderReducer,
  verificationOrderInitialState,
} from './verification-order.context';

const VerificationOrderProvider: React.FC = ({ children }) => {
  const [stateVerificationOrder, dispatchVerificationOrder] = React.useReducer(
    verificationOrderReducer,
    verificationOrderInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateVerificationOrder,
      dispatchVerificationOrder,
    }),
    [stateVerificationOrder, dispatchVerificationOrder],
  );
  return (
    <VerificationOrderContext.Provider value={valueProvider}>
      {children}
    </VerificationOrderContext.Provider>
  );
};

export { VerificationOrderProvider, VerificationOrderContext };
