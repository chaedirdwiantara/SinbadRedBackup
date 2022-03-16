/** === IMPORT INTERNAL === */
import {
  getCartInitialState,
  getCartReducer,
  GetCartInitialProps,
} from './get-cart.reducer';
import {
  GetTotalCartInitialProps,
  getTotalCartInitialState,
  getTotalCartReducer,
} from './total-cart.reducer';
import {
  addToCartInitialState,
  addToCartReducer,
  AddToCartInitialProps,
} from './add-to-cart.reducer';
import {
  updateCartInitialState,
  updateCartReducer,
  UpdateCartInitialProps,
} from './update-cart.reducer';

import {
  removeCartProductInitialState,
  removeCartProductReducer,
  RemoveCartProductInitialProps,
} from './remove-cart-product.reducer';
import {
  checkProductInitialState,
  checkProductReducer,
  CheckProductInitialProps,
} from './check-product.reducer';
import {
  postCheckProductInitialState,
  postCheckProductReducer,
  PostCheckProductInitialProps,
} from './post-check-product.reducer';
import {
  checkSellerInitialState,
  checkSellerReducer,
  CheckSellerInitialProps,
} from './check-seller.reducer';
import {
  postCheckSellerInitialState,
  postCheckSellerReducer,
  PostCheckSellerInitialProps,
} from './post-check-seller.reducer';
import {
  checkStockInitialState,
  checkStockReducer,
  CheckStockInitialProps,
} from './check-stock.reducer';
import {
  postCheckStockInitialState,
  postCheckStockReducer,
  PostCheckStockInitialProps,
} from './post-check-stock.reducer';
import {
  cancelStockInitialState,
  cancelStockReducer,
  CancelStockInitialProps,
} from './cancel-stock.reducer';
import {
  cartBuyerAddressInitialState,
  cartBuyerAddressReducer,
  CartBuyerAddressInitialProps,
} from './cart-buyer-address.reducer';

export interface CartInitialProps {
  get: GetCartInitialProps;
  total: GetTotalCartInitialProps;
  create: AddToCartInitialProps;
  update: UpdateCartInitialProps;
  remove: RemoveCartProductInitialProps;
  checkProduct: CheckProductInitialProps;
  postCheckProduct: PostCheckProductInitialProps;
  checkSeller: CheckSellerInitialProps;
  postCheckSeller: PostCheckSellerInitialProps;
  checkStock: CheckStockInitialProps;
  postCheckStock: PostCheckStockInitialProps;
  cancelStock: CancelStockInitialProps;
  buyerAddress: CartBuyerAddressInitialProps;
}
/** === INITIAL STATE === */
export const cartInitialState = {
  get: getCartInitialState,
  total: getTotalCartInitialState,
  create: addToCartInitialState,
  update: updateCartInitialState,
  remove: removeCartProductInitialState,
  checkProduct: checkProductInitialState,
  postCheckProduct: postCheckProductInitialState,
  checkSeller: checkSellerInitialState,
  postCheckSeller: postCheckSellerInitialState,
  checkStock: checkStockInitialState,
  postCheckStock: postCheckStockInitialState,
  cancelStock: cancelStockInitialState,
  buyerAddress: cartBuyerAddressInitialState,
};
/** === REDUCER === */
export const cartReducer = (
  {
    get,
    total,
    create,
    update,
    remove,
    checkProduct,
    postCheckProduct,
    checkSeller,
    postCheckSeller,
    checkStock,
    postCheckStock,
    cancelStock,
    buyerAddress,
  }: CartInitialProps,
  action: any,
) => ({
  get: getCartReducer(get, action),
  total: getTotalCartReducer(total, action),
  create: addToCartReducer(create, action),
  update: updateCartReducer(update, action),
  remove: removeCartProductReducer(remove, action),
  checkProduct: checkProductReducer(checkProduct, action),
  postCheckProduct: postCheckProductReducer(postCheckProduct, action),
  checkSeller: checkSellerReducer(checkSeller, action),
  postCheckSeller: postCheckSellerReducer(postCheckSeller, action),
  checkStock: checkStockReducer(checkStock, action),
  postCheckStock: postCheckStockReducer(postCheckStock, action),
  cancelStock: cancelStockReducer(cancelStock, action),
  buyerAddress: cartBuyerAddressReducer(buyerAddress, action),
});
