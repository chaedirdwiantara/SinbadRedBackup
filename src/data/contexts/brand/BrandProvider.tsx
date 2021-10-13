import React from 'react';
import { BrandContext, brandReducer, brandInitialState } from './brand.context';

const BrandProvider: React.FC = ({ children }) => {
  const [stateBrand, dispatchBrand] = React.useReducer(
    brandReducer,
    brandInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateBrand,
      dispatchBrand,
    }),
    [stateBrand, dispatchBrand],
  );
  return (
    <BrandContext.Provider value={valueProvider}>
      {children}
    </BrandContext.Provider>
  );
};

export { BrandProvider, BrandContext };
