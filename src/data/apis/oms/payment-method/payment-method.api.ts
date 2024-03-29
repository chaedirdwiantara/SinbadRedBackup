/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMappingV3';
import * as models from '@models';
import database from '@react-native-firebase/database';
/** === FUNCTION === */
const paymentMethodListApi = (
  payload: models.ListProcessProps<models.PaymentMethodProps>,
) => {
  const path = `payment-method-types?page=${payload.page}&perPage=${payload.perPage}&keyword=${payload.keyword}&sort=${payload.sort}&sortBy=${payload.sortBy}&amount=${payload.amount}${payload.sellerIds}`;
  return apiMapping<models.PaymentMethodList>(
    'auth',
    path,
    'buyer-payment',
    'v1',
    'LIST',
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
  const path = 'orders';
  return apiMapping<models.PaymentMethodCreateOrderResponse>(
    'auth',
    path,
    'buyer-order',
    'v1',
    'CREATE',
    data.data,
  );
};

/** check data order */
const useCheckDataOrder = (orderId: any) => {
  let dataSnap: any = [];
  database()
    .ref(`order/${orderId.data}`)
    .on('value', (snapshot) => {
      let data = snapshot.val();
      dataSnap.push(data);
    });

  return dataSnap;
};
/** commit cart endpoint*/
const commitCartApi = (
  data: models.CreateProcessProps<models.PaymentMethodCommitCartData>,
) => {
  const path = 'carts/commit';
  return apiMapping<models.CommitCartResponseData>(
    'auth',
    path,
    'buyer-cart',
    'v2',
    'CREATE',
    data.data,
  );
};

/** === EXPORT FUNCTIONS === */
export const PaymentMethodListApi = {
  paymentMethodListApi,
  paymentMethodGetWaitingPaymentOrderApi,
  paymentMethodCreateOrdertApi,
  useCheckDataOrder,
  commitCartApi,
};
