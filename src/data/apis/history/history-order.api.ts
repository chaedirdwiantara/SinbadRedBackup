/** === IMPORT INTERNAL === */
import { serializeQs } from '@core/functions/global/query-string';
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === CONSTANT === */
const historyBasePath = 'order-parcels';
/** === FUNCTIONS === */
const getOrderStatus = () => {
  return apiMapping<models.DetailSuccessProps<Array<models.OrderStatus>>>(
    'auth',
    `${historyBasePath}/status`,
    'order',
    'v1',
    'DETAIL',
  );
};

const getHistoryList = (payload: models.HistoryListProcessProps) => {
  const qs = serializeQs({
    skip: payload.skip,
    limit: payload.limit,
    statusOrder: payload.statusOrder,
    statusPayment: payload.statusPayment,
    startDate: payload.startDate,
    endDate: payload.endDate,
    search: payload.search,
  });

  return apiMapping<Array<models.OrderParcels>>(
    'auth',
    `${historyBasePath}?${qs}`,
    'order',
    'v1',
    'LIST',
  );
};

const getDetail = (payload: models.DetailProcessProps) => {
  return apiMapping<models.HistoryDetail>(
    'public',
    `${historyBasePath}/${payload.id}`,
    'product',
    'v1',
    'DETAIL',
  );
};

export const HistoryOrderApi = {
  getOrderStatus,
  getHistoryList,
  getDetail,
};
