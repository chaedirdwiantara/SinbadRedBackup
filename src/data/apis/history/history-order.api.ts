import apiMapping from '@core/services/apiMapping';
import * as models from '@models';

const orderStatus = () => {
  const path = 'order-parcels/status';
  return apiMapping<models.DetailSuccessProps<models.OrderStatusSuccessProps>>(
    'public',
    path,
    'order',
    'v1',
    'DETAIL',
  );
};

export const HistoryOrderApi = {
  orderStatus,
};
