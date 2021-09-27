import React from 'react';
import {
  VoucherCartContext,
  voucherCartInitialState,
  voucherCartReducer,
} from './voucherCart.context';

const VoucherCartProvider: React.FC = ({ children }) => {
  const [stateVoucherCart, dispatchVoucherCart] = React.useReducer(
    voucherCartReducer,
    voucherCartInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateVoucherCart,
      dispatchVoucherCart,
    }),
    [stateVoucherCart, dispatchVoucherCart],
  );
  return (
    <VoucherCartContext.Provider value={valueProvider}>
      {children}
    </VoucherCartContext.Provider>
  );
};

export { VoucherCartProvider, VoucherCartContext };
