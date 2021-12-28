/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => payment status list */
const paymentStatusList = (data: models.ListProcessProps) => {
  const path = 'payment-status?perPage=8&page=1';
  return apiMapping<models.IPaymentStatusList[]>(
    'auth',
    path,
    'payment',
    'v1',
    'LIST',
  );
};

export const PaymentStatusApi = {
  paymentStatusList,
};
