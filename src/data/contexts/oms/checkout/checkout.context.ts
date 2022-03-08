import React from 'react';
import {
  CheckoutInitialProps,
  checkoutReducer,
  checkoutInitialState,
} from '@reducer/oms/checkout/checkout.reducer';

const CheckoutContext = React.createContext<{
  // state: InitialStateType;
  stateCheckout: CheckoutInitialProps;
  dispatchCheckout: React.Dispatch<any>;
}>({
  // state: initialState,
  stateCheckout: checkoutInitialState,
  dispatchCheckout: () => null,
});

export { CheckoutContext, checkoutReducer, checkoutInitialState };
