/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';

const getCartView = (payload: models.DetailProcessProps) => {
  const path = `carts/${payload.id}`;
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
  const path = `carts/${payload.cartId}`;
  return apiMapping('auth', path, 'cart', 'v1', 'PATCH', payload);
};

export const CartApi = {
  getCartView,
  addToCart,
  updateCart,
};
