/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';

const getCheckout = () => {
  const path = 'carts/checkout';
  return apiMapping<models.CheckoutSuccess>(
    'auth',
    path,
    'cart',
    'v1',
    'DETAIL',
  );
};

export const CheckoutApi = {
  getCheckout,
};
