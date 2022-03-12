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

// ENDPOINT STILL WRONG
const paymentMethodGetWaitingPaymentOrderApi = (
  payload: models.ListProcessProps<models.PaymentMethodGetWaitingPaymentOrder>,
) => {
  const path = `orders?skip=${payload.skip}&limit=${payload.limit}&keyword=${payload.keyword}&sort=${payload.sort}&sortBy=${payload.sortBy}&status=${payload.status}`;
  return apiMapping<models.PaymentMethodGetWaitingPaymentOrder>(
    'auth',
    path,
    'order',
    'v1',
    'DETAIL',
  );
};

// ENDPOINT STILL WRONG
const paymentMethodCreateOrdertApi = (
  data: models.CreateProcessProps<models.PaymentMethodCreateOrderData>,
) => {
  const path = `create-order`;
  return apiMapping<models.PaymentMethodList>(
    'auth',
    path,
    'order',
    'v1',
    'CREATE',
    data.data,
  );
};

/** === EXPORT FUNCTIONS === */
export const PaymentMethodListApi = {
  paymentMethodListApi,
  paymentMethodGetWaitingPaymentOrderApi,
  paymentMethodCreateOrdertApi,
};
