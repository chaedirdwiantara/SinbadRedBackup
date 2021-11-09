import React from 'react';
import {
  BannerInitialProps,
  bannerInitialState,
  bannerReducer,
} from '@reducer/banner/banner.reducer';

const BannerContext = React.createContext<{
  // state: InitialStateType;
  stateBanner: BannerInitialProps;
  dispatchBanner: React.Dispatch<any>;
}>({
  // state: initialState,
  stateBanner: bannerInitialState,
  dispatchBanner: () => null,
});

export { BannerContext, bannerReducer, bannerInitialState };
