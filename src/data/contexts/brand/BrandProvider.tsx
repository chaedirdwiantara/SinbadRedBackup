import React, { FC, useReducer, useMemo } from 'react';

import { BrandContext, brandReducer, brandInitialState } from './brand.context';

const BrandProvider: FC = ({ children }) => {
  const [stateBrand, dispatchBrand] = useReducer(
    brandReducer,
    brandInitialState,
  );
  const valueProvider = useMemo(
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
