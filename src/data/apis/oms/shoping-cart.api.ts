/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';

const getCartView = (payload: models.DetailProcessProps) => {
  const path = `/${payload.id}`;
  return apiMapping<models.CartSuccessProps>(
    'auth',
    path,
    'cart',
    'v1',
    'DETAIL',
  );
};

const addToCart = (
  payload: models.CreateProcessProps<models.AddToCartProps>,
) => {
  const path = '';
  return apiMapping('auth', path, 'cart', 'v1', 'CREATE', payload.data);
};

export const CartApi = {
  getCartView,
  addToCart,
};
