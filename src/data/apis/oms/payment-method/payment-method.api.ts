/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import apiMappingMock from '@core/services/apiMappingMockV3';
import * as models from '@models';
/** === FUNCTION === */
const paymentMethodListApi = (
  payload: models.ListProcessProps<models.PaymentMethodList>,
) => {
  const path = `payment-method-types?skip=${payload.skip}&limit=${payload.limit}&keyword=${payload.keyword}&sort=${payload.sort}&sortBy=${payload.sortBy}&amount=${payload.amount}`;
  return apiMapping<models.PaymentMethodList>(
    'auth',
    path,
    'order',
    'v1',
    'DETAIL',
  );
};

const paymentMethodGetWaitingPaymentOrder = (
  payload: models.ListProcessProps<models.PaymentMethodGetWaitingPaymentOrder>,
) => {
  const path = `orders?skip=${payload.skip}&limit=${payload.limit}&keyword=${payload.keyword}&sort=${payload.sort}&sortBy=${payload.sortBy}&status=${payload.status}`;
  return apiMapping<models.PaymentMethodList>(
    'auth',
    path,
    'order',
    'v1',
    'DETAIL',
  );
};

/** === EXPORT FUNCTIONS === */
export const PaymentMethodListApi = {
  paymentMethodListApi,
  paymentMethodGetWaitingPaymentOrder,
};
