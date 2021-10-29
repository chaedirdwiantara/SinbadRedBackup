import React, { FC, useReducer, useMemo } from 'react';

import {
  ProductContext,
  productReducer,
  productInitialState,
} from './product.context';

const ProductProvider: FC = ({ children }) => {
  const [stateProduct, dispatchProduct] = useReducer(
    productReducer,
    productInitialState,
  );
  const contextValue = useMemo(
    () => ({
      stateProduct,
      dispatchProduct,
    }),
    [stateProduct, dispatchProduct],
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
