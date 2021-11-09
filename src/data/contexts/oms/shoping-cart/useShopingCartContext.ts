import { useContext } from 'react';

import { ShopingCartContext } from './shoping-cart.context';

export const useShopingCartContext = () => {
  const context = useContext(ShopingCartContext);

  if (context === undefined) {
    throw new Error(
      'useShopingCartContext was used outside of ShopingCartProvider',
    );
  }

  return context;
};
