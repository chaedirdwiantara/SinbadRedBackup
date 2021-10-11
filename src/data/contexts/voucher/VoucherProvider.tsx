import React from 'react';
import {
  VoucherContext,
  voucherInitialState,
  voucherReducer,
} from './voucher.context';

const VoucherProvider: React.FC = ({ children }) => {
  const [stateVoucher, dispatchVoucher] = React.useReducer(
    voucherReducer,
    voucherInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateVoucher,
      dispatchVoucher,
    }),
    [stateVoucher, dispatchVoucher],
  );
  return (
    <VoucherContext.Provider value={valueProvider}>
      {children}
    </VoucherContext.Provider>
  );
};

export { VoucherProvider, VoucherContext };
