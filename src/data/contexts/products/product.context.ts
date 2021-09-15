import React from 'react';
import {
  ProductInitialProps,
  productInitialState,
  productReducer,
} from '@reducer/products/product.reducer';

const ProductContext = React.createContext<{
  // state: InitialStateType;
  stateProduct: ProductInitialProps;
  dispatchProduct: React.Dispatch<any>;
}>({
  // state: initialState,
  stateProduct: productInitialState,
  dispatchProduct: () => null,
});

export { ProductContext, productReducer, productInitialState };
