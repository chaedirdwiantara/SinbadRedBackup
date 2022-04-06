import React from 'react';
import { CartContext, cartInitialState, cartReducer } from './cart.context';

const CartProvider: React.FC = ({ children }) => {
  const [stateCart, dispatchCart] = React.useReducer(
    cartReducer,
    cartInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateCart,
      dispatchCart,
    }),
    [stateCart, dispatchCart],
  );
  return (
    <CartContext.Provider value={valueProvider}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
