import React, { FC, useReducer, useMemo } from 'react';

import {
  ShopingCartContext,
  shopingCartReducer,
  shopingCartInitialState,
} from './shoping-cart.context';

const ShopingCartProvider: FC = ({ children }) => {
  const [stateShopingCart, dispatchShopingCart] = useReducer(
    shopingCartReducer,
    shopingCartInitialState,
  );
  const contextValue = useMemo(
    () => ({
      stateShopingCart,
      dispatchShopingCart,
    }),
    [stateShopingCart, dispatchShopingCart],
  );
  return (
    <ShopingCartContext.Provider value={contextValue}>
      {children}
    </ShopingCartContext.Provider>
  );
};

export { ShopingCartProvider, ShopingCartContext };
