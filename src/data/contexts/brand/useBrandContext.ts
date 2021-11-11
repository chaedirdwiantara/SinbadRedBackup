import { useContext } from 'react';

import { BrandContext } from './brand.context';

export const useBrandContext = () => {
  const context = useContext(BrandContext);

  if (context === undefined) {
    throw new Error('useBrandContext was used outside of BrandProvider');
  }

  return context;
};
