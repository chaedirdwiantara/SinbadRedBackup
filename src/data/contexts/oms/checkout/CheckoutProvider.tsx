import React, { FC, useReducer, useMemo } from 'react';

import {
  CheckoutContext,
  checkoutInitialState,
  checkoutReducer,
} from './checkout.context';

const CheckoutProvider: FC = ({ children }) => {
  const [stateCheckout, dispatchCheckout] = useReducer(
    checkoutReducer,
    checkoutInitialState,
  );
  const contextValue = useMemo(
    () => ({
      stateCheckout,
      dispatchCheckout,
    }),
    [stateCheckout, dispatchCheckout],
  );
  return (
    <CheckoutContext.Provider value={contextValue}>
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutProvider, CheckoutContext };
