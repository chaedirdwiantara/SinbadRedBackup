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
  console.log('[PAYLOAD ADD TO CART]: ', payload);
  const path = 'carts';
  return apiMapping('auth', path, 'cart', 'v1', 'CREATE', payload);
};

const updateCart = (payload: models.CartUpdatePayload) => {
  const path = 'carts';
  return apiMapping('auth', path, 'cart', 'v1', 'PATCH', payload);
};

export const CartApi = {
  getCartView,
  addToCart,
  updateCart,
};
