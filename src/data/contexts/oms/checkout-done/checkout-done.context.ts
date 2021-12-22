import { createContext, Dispatch } from 'react';

import {
  CheckoutDoneState,
  checkoutDoneInitialState,
  checkoutDoneReducer,
} from '@reducer/oms/checkout-done/checkout-done.reducer';

const CheckoutDoneContext = createContext<{
  stateCheckoutDone: CheckoutDoneState;
  dispatchCheckoutDone: Dispatch<any>;
}>({
  stateCheckoutDone: checkoutDoneInitialState,
  dispatchCheckoutDone: () => null,
});

export { CheckoutDoneContext, checkoutDoneReducer, checkoutDoneInitialState };
