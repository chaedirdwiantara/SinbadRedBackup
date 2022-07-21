/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMappingV3';
import * as models from '@models';
import { serializeQs } from '@core/functions/global/query-string';
/** === FUNCTIONS === */
//get payment history
export const getOrderHistoryListPayment = (
  payload: models.PaymentListHistoryQueryOptions,
) => {
  const path = 'orders/waiting-for-payment';
  const qs = serializeQs({
    page: payload.page,
    perPage: payload.perPage,
  });
  return apiMapping<Array<models.WaitingPaymentListHistory>>(
    'auth',
    `${path}?${qs}`,
    'buyer-order',
    'v1',
    'LIST',
  );
};
