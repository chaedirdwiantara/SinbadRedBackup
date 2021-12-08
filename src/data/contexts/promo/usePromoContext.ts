import { useContext } from 'react';

import { PromoContext } from './promo.context';

export const usePromoContext = () => {
  const context = useContext(PromoContext);

  if (context === undefined) {
    throw new Error('usePromoContext was used outside of SupplierProvider');
  }

  return context;
};
