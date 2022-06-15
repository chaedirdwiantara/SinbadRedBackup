/** === IMPORT INTERNAL === */
import apiMapping from '@core/services/apiMappingV3';
import * as models from '@models';

/** === FUNCTIONS === */
//get payment history
export const getOrderHistoryListPayment = () => {
  const path = 'orders/waiting-for-payment';
  return apiMapping<Array<models.WaitingPaymentListHistory>>(
    'auth',
    path,
    'buyer-order',
    'v1',
    'LIST',
  );
};
