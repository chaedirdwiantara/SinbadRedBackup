import React from 'react';
import {
  PromoInitialProps,
  promoInitialState,
  promoReducer,
} from '@reducer/promo/promo.reducer';

const PromoContext = React.createContext<{
  // state: InitialStateType;
  statePromo: PromoInitialProps;
  dispatchPromo: React.Dispatch<any>;
}>({
  // state: initialState,
  statePromo: promoInitialState,
  dispatchPromo: () => null,
});

export { PromoContext, promoReducer, promoInitialState };
