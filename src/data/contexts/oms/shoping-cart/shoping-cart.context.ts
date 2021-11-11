import { createContext, Dispatch } from 'react';

import {
  ShopingCartState,
  shopingCartInitialState,
  shopingCartReducer,
} from '@reducer/oms/shoping-cart/shoping-cart.reducer';

const ShopingCartContext = createContext<{
  stateShopingCart: ShopingCartState;
  dispatchShopingCart: Dispatch<any>;
}>({
  stateShopingCart: shopingCartInitialState,
  dispatchShopingCart: () => null,
});

export { ShopingCartContext, shopingCartReducer, shopingCartInitialState };
