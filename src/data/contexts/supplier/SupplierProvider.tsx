import React, { FC, useReducer, useMemo } from 'react';

import {
  SupplierContext,
  supplierReducer,
  supplierInitialState,
} from './supplier.context';

const SupplierProvider: FC = ({ children }) => {
  const [stateSupplier, dispatchSupplier] = useReducer(
    supplierReducer,
    supplierInitialState,
  );
  const contextValue = useMemo(
    () => ({
      stateSupplier,
      dispatchSupplier,
    }),
    [stateSupplier, dispatchSupplier],
  );
  return (
    <SupplierContext.Provider value={contextValue}>
      {children}
    </SupplierContext.Provider>
  );
};

export { SupplierProvider, SupplierContext };
