/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import apiMappingMock from '@core/services/apiMappingMockV3';
import * as models from '@models';
/** === FUNCTION === */
const paymentMethodTypeApi = (
  payload: models.ListProcessProps<models.PaymentMethodType>,
) => {
  const path = `payment-method-types?skip=${payload.skip}&limit=${payload.limit}&keyword=${payload.keyword}&sort=${payload.sort}&sortBy=${payload.sortBy}&amount=${payload.amount}`;
  return apiMapping<models.PaymentMethodType>(
    'auth',
    path,
    'order',
    'v1',
    'DETAIL',
  );
};

/** === EXPORT FUNCTIONS === */
export const PaymentMethodTypeApi = {
  paymentMethodTypeApi,
};
