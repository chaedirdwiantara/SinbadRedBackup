import apiMapping from '@core/services/apiMapping';
import apiMappingMock from '@core/services/apiMappingMock';
import * as models from '@models';

const orderStatus = () => {
  const path = 'order-parcels/status';

  return apiMapping<models.DetailSuccessProps<models.OrderStatusSuccessProps>>(
    'auth',
    path,
    'order',
    'v1',
    'DETAIL',
  );
};

const historyList = (data: any) => {
  const path = `orders?limit=10&skip=0&status=${data.status}&startOrderDate=${data.startOrderDate}&endOrderDate=${data.endOrderDate}&keyword=${data.keyword}&paymentStatus=${data.statusPayment}`;
  // return apiMapping<models.ListSuccessProps<any>>(
  //   'auth',
  //   path,
  //   'order',
  //   'v1',
  //   'LIST',
  // );
  const mockHost = 'https://7d57c2be-7226-4fe4-87b7-d9df7cbaaa98.mock.pstmn.io';
  return apiMappingMock<
    models.ListSuccessProps<models.HistoryListSuccessProps>
  >(mockHost, path, 'order', 'v1', 'LIST');
};

export const HistoryOrderApi = {
  orderStatus,
  historyList,
};
