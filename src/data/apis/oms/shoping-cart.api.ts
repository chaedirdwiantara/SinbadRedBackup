/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';

const getCartView = () => {
  const path = 'carts';
  return apiMapping<models.CartSuccessProps>(
    'auth',
    path,
    'cart',
    'v1',
    'DETAIL',
  );
};

const addToCart = (payload: models.AddToCartPayload) => {
  const path = 'carts';
  return apiMapping('auth', path, 'cart', 'v1', 'CREATE', payload);
};

const updateCart = (payload: models.CartUpdatePayload) => {
  const path = 'carts';
  return apiMapping('auth', path, 'cart', 'v1', 'UPDATE', payload);
};

const getCartTotalProduct = () => {
  const path = 'carts/total-product';
  return apiMapping<models.CartTotalProductSuccess>(
    'auth',
    path,
    'cart',
    'v1',
    'DETAIL',
  );
};

const updateCartCheckedout = () => {
  const path = 'carts/checkedout';
  return apiMapping('auth', path, 'cart', 'v1', 'UPDATE', {});
};

export const CartApi = {
  getCartView,
  addToCart,
  updateCart,
  getCartTotalProduct,
  updateCartCheckedout,
};
