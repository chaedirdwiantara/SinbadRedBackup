import React from 'react';
import { PromoContext, promoInitialState, promoReducer } from './promo.context';

const PromoProvider: React.FC = ({ children }) => {
  const [statePromo, dispatchPromo] = React.useReducer(
    promoReducer,
    promoInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      statePromo,
      dispatchPromo,
    }),
    [statePromo, dispatchPromo],
  );
  return (
    <PromoContext.Provider value={valueProvider}>
      {children}
    </PromoContext.Provider>
  );
};

export { PromoProvider, PromoContext };
