import React from 'react';
import {
  BannerContext,
  bannerReducer,
  bannerInitialState,
} from './banner.context';

const BannerProvider: React.FC = ({ children }) => {
  const [stateBanner, dispatchBanner] = React.useReducer(
    bannerReducer,
    bannerInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateBanner,
      dispatchBanner,
    }),
    [stateBanner, dispatchBanner],
  );
  return (
    <BannerContext.Provider value={valueProvider}>
      {children}
    </BannerContext.Provider>
  );
};

export { BannerProvider, BannerContext };
