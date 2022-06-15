import React from 'react';
import {
  CheckoutContext,
  checkoutInitialState,
  checkoutReducer,
} from './checkout.context';

const CheckoutProvider: React.FC = ({ children }) => {
  const [stateCheckout, dispatchCheckout] = React.useReducer(
    checkoutReducer,
    checkoutInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateCheckout,
      dispatchCheckout,
    }),
    [stateCheckout, dispatchCheckout],
  );
  return (
    <CheckoutContext.Provider value={valueProvider}>
      {children}
    </CheckoutContext.Provider>
  );
};

export { CheckoutProvider, CheckoutContext };
