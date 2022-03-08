import React from 'react';
import {
  CartInitialProps,
  cartReducer,
  cartInitialState,
} from '@reducer/oms/cart/cart.reducer';

const CartContext = React.createContext<{
  // state: InitialStateType;
  stateCart: CartInitialProps;
  dispatchCart: React.Dispatch<any>;
}>({
  // state: initialState,
  stateCart: cartInitialState,
  dispatchCart: () => null,
});

export { CartContext, cartReducer, cartInitialState };
