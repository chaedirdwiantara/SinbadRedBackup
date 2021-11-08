import { createContext, Dispatch } from 'react';

import {
  ProductState,
  productInitialState,
  productReducer,
} from '@reducer/product/product.reducer';

const ProductContext = createContext<{
  stateProduct: ProductState;
  dispatchProduct: Dispatch<any>;
}>({
  stateProduct: productInitialState,
  dispatchProduct: () => null,
});

export { ProductContext, productReducer, productInitialState };
