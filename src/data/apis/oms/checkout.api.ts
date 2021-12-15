/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMapping';
import apiMappingMock from '@core/services/apiMappingMock';
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

const getOrdersDetail = (id: models.DetailProcessProps) => {
  const mockPath =
    'https://7d57c2be-7226-4fe4-87b7-d9df7cbaaa98.mock.pstmn.io/api/v1/sinbad-app/orders/2246200';
  const path = `orders/${id}`;
  return apiMappingMock<models.DetailSuccessProps<models.CheckoutDoneOrders>>(
    mockPath,
    path,
    'order',
    'v1',
    'DETAIL',
  );
};

export const CheckoutApi = {
  getCheckout,
  createOrders,
  getOrdersDetail,
};
