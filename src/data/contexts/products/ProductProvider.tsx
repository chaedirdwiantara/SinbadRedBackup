import React from 'react';
import {
  ProductContext,
  productReducer,
  productInitialState,
} from './product.context';

const ProductProvider: React.FC = ({ children }) => {
  const [stateProduct, dispatchProduct] = React.useReducer(
    productReducer,
    productInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateProduct,
      dispatchProduct,
    }),
    [stateProduct, dispatchProduct],
  );
  return (
    <ProductContext.Provider value={valueProvider}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext };
