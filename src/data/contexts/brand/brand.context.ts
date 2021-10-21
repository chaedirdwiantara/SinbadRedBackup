import React from 'react';
import {
  BrandInitialProps,
  brandInitialState,
  brandReducer,
} from '@reducer/brand/brand.reducer';

const BrandContext = React.createContext<{
  // state: InitialStateType;
  stateBrand: BrandInitialProps;
  dispatchBrand: React.Dispatch<any>;
}>({
  // state: initialState,
  stateBrand: brandInitialState,
  dispatchBrand: () => null,
});

export { BrandContext, brandReducer, brandInitialState };
