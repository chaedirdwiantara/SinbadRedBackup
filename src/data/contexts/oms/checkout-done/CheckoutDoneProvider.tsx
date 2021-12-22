import React, { FC, useReducer, useMemo } from 'react';

import {
  CheckoutDoneContext,
  checkoutDoneInitialState,
  checkoutDoneReducer,
} from './checkout-done.context';

const CheckoutDoneProvider: FC = ({ children }) => {
  const [stateCheckoutDone, dispatchCheckoutDone] = useReducer(
    checkoutDoneReducer,
    checkoutDoneInitialState,
  );
  const contextValue = useMemo(
    () => ({
      stateCheckoutDone,
      dispatchCheckoutDone,
    }),
    [stateCheckoutDone, dispatchCheckoutDone],
  );

  return (
    <CheckoutDoneContext.Provider value={contextValue}>
      {children}
    </CheckoutDoneContext.Provider>
  );
};

export { CheckoutDoneProvider, CheckoutDoneContext };
