import { createContext, Dispatch } from 'react';

import {
  CheckoutState,
  checkoutInitialState,
  checkoutReducer,
} from '@reducer/oms/checkout/checkout.reducer';

const CheckoutContext = createContext<{
  stateCheckout: CheckoutState;
  dispatchCheckout: Dispatch<any>;
}>({
  stateCheckout: checkoutInitialState,
  dispatchCheckout: () => null,
});

export { CheckoutContext, checkoutReducer, checkoutInitialState };
