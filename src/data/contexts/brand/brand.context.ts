import { createContext, Dispatch } from 'react';

import {
  BrandState,
  brandInitialState,
  brandReducer,
} from '@reducer/brand/brand.reducer';

const BrandContext = createContext<{
  stateBrand: BrandState;
  dispatchBrand: Dispatch<any>;
}>({
  stateBrand: brandInitialState,
  dispatchBrand: () => null,
});

export { BrandContext, brandReducer, brandInitialState };
