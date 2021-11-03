import { useContext } from 'react';

import { ProductContext } from './product.context';

export const useProductContext = () => {
  const context = useContext(ProductContext);

  if (context === undefined) {
    throw new Error('useProductContext was used outside of ProductProvider');
  }

  return context;
};
