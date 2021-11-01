import { createContext, Dispatch } from 'react';

import {
  ProductInitialProps,
  productInitialState,
  productReducer,
} from '@reducer/product/product.reducer';

const ProductContext = createContext<{
  stateProduct: ProductInitialProps;
  dispatchProduct: Dispatch<any>;
}>({
  stateProduct: productInitialState,
  dispatchProduct: () => null,
});

export { ProductContext, productReducer, productInitialState };
