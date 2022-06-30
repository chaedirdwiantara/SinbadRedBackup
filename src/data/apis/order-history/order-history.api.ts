/** === IMPORT INTERNAL === */
import { serializeQs } from '@core/functions/global/query-string';
import apiMappingV3 from '@core/services/apiMappingV3';
import * as models from '@models';

/** === CONSTANT === */
const historyOrderPath = 'order-histories';
const orderSellerPath = 'order-sellers';

/** === FUNCTIONS === */
// get order history list
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
// get consolidate order history
export const getOrderConsolidateHistoryDetail = ({ id }: { id: string }) => {
  return apiMappingV3<Array<models.OrderListHistory>>(
    'auth',
    `${historyOrderPath}/consolidate/SNE-2121182635172`,
    // `${historyOrderPath}/${id}`,
    'buyer-order',
    'v1',
    'DETAIL',
  );
};
// get detail order history
export const getOrderHistoryDetail = ({ id }: { id: string }) => {
  return apiMappingV3<Array<models.OrderListHistory>>(
    'auth',
    `${historyOrderPath}/${id}`,
    'buyer-order',
    'v1',
    'DETAIL',
  );
};
// get detail tracking order history
export const getOrderHistoryTrackingDetail = ({ id }: { id: string }) => {
  return apiMappingV3<Array<models.orderTrackingDetailHistory>>(
    'auth',
    `${historyOrderPath}/${id}/histories`,
    'buyer-order',
    'v1',
    'DETAIL',
  );
};
// update done order history
export const postDoneOrderHistory = ({
  id,
}: models.UpdateOrderHistoryProcessProps) => {
  return apiMappingV3<Array<models.orderTrackingDetailHistory>>(
    'auth',
    `${orderSellerPath}/${id}/done`,
    'buyer-order',
    'v1',
    'CREATE',
  );
};
// update cancel order history
export const postCancelOrderHistory = ({
  id,
}: models.UpdateOrderHistoryProcessProps) => {
  return apiMappingV3<Array<models.orderTrackingDetailHistory>>(
    'auth',
    `${orderSellerPath}/${id}/cancel`,
    'buyer-order',
    'v1',
    'CREATE',
  );
};
