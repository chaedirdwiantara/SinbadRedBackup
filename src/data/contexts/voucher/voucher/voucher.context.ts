import React from 'react';
import {
  voucherInitialState,
  voucherReducer,
  VoucherInitialProps,
} from '@reducer/voucher/voucher/voucher.reducer';

const VoucherContext = React.createContext<{
  // state: InitialStateType;
  stateVoucher: VoucherInitialProps;
  dispatchVoucher: React.Dispatch<any>;
}>({
  // state: initialState,
  stateVoucher: voucherInitialState,
  dispatchVoucher: () => null,
});

export { VoucherContext, voucherReducer, voucherInitialState };
