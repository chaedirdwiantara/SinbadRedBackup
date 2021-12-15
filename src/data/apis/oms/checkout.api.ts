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

const createOrders = (data: models.CreateOrders) => {
  const path = 'orders';
  return apiMapping<models.CreateOrderSuccess>(
    'auth',
    path,
    'order',
    'v1',
    'CREATE',
    data,
  );
};

export const CheckoutApi = {
  getCheckout,
  createOrders,
};
