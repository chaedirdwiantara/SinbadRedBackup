import { createContext, Dispatch } from 'react';

import {
  ShopingCartInitialProps,
  shopingCartInitialState,
  shopingCartReducer,
} from '@reducer/oms/shoping-cart/shoping-cart.reducer';

const ShopingCartContext = createContext<{
  stateShopingCart: ShopingCartInitialProps;
  dispatchShopingCart: Dispatch<any>;
}>({
  stateShopingCart: shopingCartInitialState,
  dispatchShopingCart: () => null,
});

export { ShopingCartContext, shopingCartReducer, shopingCartInitialState };
