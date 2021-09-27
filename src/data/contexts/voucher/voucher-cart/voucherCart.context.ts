import React from 'react';
import {
  VoucherCartInitialProps,
  voucherCartInitialState,
  voucherCartReducer,
} from '@reducer/voucher/voucher-cart/voucher-cart.reducer';

const VoucherCartContext = React.createContext<{
  // state: InitialStateType;
  stateVoucherCart: VoucherCartInitialProps;
  dispatchVoucherCart: React.Dispatch<any>;
}>({
  // state: initialState,
  stateVoucherCart: voucherCartInitialState,
  dispatchVoucherCart: () => null,
});

export { VoucherCartContext, voucherCartReducer, voucherCartInitialState };
