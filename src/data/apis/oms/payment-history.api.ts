/** === IMPORT INTERNAL === */
import { serializeQs } from '@core/functions/global/query-string';
import apiMapping from '@core/services/apiMappingV3';
import * as models from '@models';

/** === CONSTANT === */
const historyOrderPaymentPath = 'orders';

/** === FUNCTIONS === */
//get payment history
export const getOrderHistoryListPayment = (
  payload: models.PaymentListHistoryProcessProps,
) => {
  const qs = serializeQs({
    page: payload.page,
    perPage: payload.perPage,
    status: payload.status,
    orderStatus: payload.orderStatus,
    keyword: payload.keyword,
    sort: payload.sort,
    sortBy: payload.sortBy
  });

  return apiMapping<Array<models.WaitingPaymentListHistory>>(
    'auth',
    `${historyOrderPaymentPath}?${qs}`,
    'buyer-order',
    'v1',
    'LIST',
  );
};
