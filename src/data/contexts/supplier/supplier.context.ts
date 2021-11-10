import { createContext, Dispatch } from 'react';

import {
  SupplierState,
  supplierInitialState,
  supplierReducer,
} from '@reducer/supplier/supplier.reducer';

const SupplierContext = createContext<{
  stateSupplier: SupplierState;
  dispatchSupplier: Dispatch<any>;
}>({
  stateSupplier: supplierInitialState,
  dispatchSupplier: () => null,
});

export { SupplierContext, supplierReducer, supplierInitialState };
