import { createContext, Dispatch } from 'react';

import {
  SupplierInitialProps,
  supplierInitialState,
  supplierReducer,
} from '@reducer/supplier/supplier.reducer';

const SupplierContext = createContext<{
  stateSupplier: SupplierInitialProps;
  dispatchSupplier: Dispatch<any>;
}>({
  stateSupplier: supplierInitialState,
  dispatchSupplier: () => null,
});

export { SupplierContext, supplierReducer, supplierInitialState };
