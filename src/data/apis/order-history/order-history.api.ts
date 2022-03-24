/** === IMPORT INTERNAL === */
import { serializeQs } from '@core/functions/global/query-string';
import apiMapping from '@core/services/apiMappingV3';
import * as models from '@models';

/** === CONSTANT === */
const historyOrderPath = 'order-histories';
const historyOrderPaymentPath = 'orders';

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

  return apiMapping<Array<models.OrderListHistory>>(
    'auth',
    `${historyOrderPath}?${qs}`,
    'buyer-order',
    'v1',
    'LIST',
  );
};

export const getOrderHistoryListPayment = (
  payload: models.OrderListHistoryProcessProps,
) => {
  const qs = serializeQs({
    page: payload.page,
    perPage: payload.perPage,
    status: payload.status,
    orderStatus: payload.orderStatus,
    keyword: payload.keyword,
  });

  return apiMapping<Array<models.WaitingPaymentListHistory>>(
    'auth',
    `${historyOrderPaymentPath}?${qs}`,
    'buyer-order',
    'v1',
    'LIST',
  );
};