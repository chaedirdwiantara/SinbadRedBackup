import React from 'react';
import {
  MerchantContext,
  merchantReducer,
  supplierInitialState,
} from './merchant.context';

const MerchantProvider: React.FC = ({ children }) => {
  const [stateMerchant, dispatchSupplier] = React.useReducer(
    merchantReducer,
    supplierInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateMerchant,
      dispatchSupplier,
    }),
    [stateMerchant, dispatchSupplier],
  );
  return (
    <MerchantContext.Provider value={valueProvider}>
      {children}
    </MerchantContext.Provider>
  );
};

export { MerchantProvider, MerchantContext };
