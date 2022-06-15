import React from 'react';
import {
  CheckoutInitialProps,
  checkoutReducer,
  checkoutInitialState,
} from '@reducer/oms/checkout/checkout.reducer';

const CheckoutContext = React.createContext<{
  stateCheckout: CheckoutInitialProps;
  dispatchCheckout: React.Dispatch<any>;
}>({
  stateCheckout: checkoutInitialState,
  dispatchCheckout: () => null,
});

export { CheckoutContext, checkoutReducer, checkoutInitialState };
