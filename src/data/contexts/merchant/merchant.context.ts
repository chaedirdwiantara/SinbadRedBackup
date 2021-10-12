import React from 'react';
import {
  MerchantInitialProps,
  supplierInitialState,
  merchantReducer,
} from '@reducer/merchant/merchant.reducer';

const MerchantContext = React.createContext<{
  // state: InitialStateType;
  stateMerchant: MerchantInitialProps;
  dispatchSupplier: React.Dispatch<any>;
}>({
  // state: initialState,
  stateMerchant: supplierInitialState,
  dispatchSupplier: () => null,
});

export { MerchantContext, merchantReducer, supplierInitialState };
