/** === IMPORT INTERNAL === */
import { serializeQs } from '@core/functions/global/query-string';
import apiMappingV3 from '@core/services/apiMappingV3';
import * as models from '@models';

/** === CONSTANT === */
const historyOrderPath = 'order-histories';

/** === FUNCTIONS === */
export const getOrderHistoryList = (
  payload: models.OrderListHistoryProcessProps,
) => {
  const qs = serializeQs({
    page: payload.page,
    perPage: payload.perPage,
    status: payload.status,
    orderStatus: payload.orderStatus,
    keyword: payload.keyword,
  });

  return apiMappingV3<Array<models.OrderListHistory>>(
    'auth',
    `${historyOrderPath}?${qs}`,
    'buyer-order',
    'v1',
    'LIST',
  );
};

export const getOrderHistoryDetail = ({ id }: { id: string }) => {
  return apiMappingV3<Array<models.OrderListHistory>>(
    'auth',
    `${historyOrderPath}/${id}`,
    'buyer-order',
    'v1',
    'DETAIL',
  );
};
