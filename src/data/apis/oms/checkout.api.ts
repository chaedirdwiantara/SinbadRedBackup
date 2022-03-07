/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMappingV3';
import * as models from '@models';

const checkoutCart = ({
  data,
}: models.CreateProcessProps<models.CheckoutPayload>) => {
  const path = 'checkouts';
  return apiMapping<models.CheckoutResponse>(
    'auth',
    path,
    'buyer-cart',
    'v1',
    'CREATE',
    data,
  );
};

export const CheckoutApi = {
  checkoutCart,
};
