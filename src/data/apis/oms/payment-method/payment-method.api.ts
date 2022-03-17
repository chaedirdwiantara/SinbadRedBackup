/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMappingV3';
import * as ActionCreators from '@actions';
import apiMappingMock from '@core/services/apiMappingMockV3';
import { useDispatch } from 'react-redux';
import * as models from '@models';
import { uniqueId } from '@core/functions/global/device-data';
import database from '@react-native-firebase/database';
/** === FUNCTION === */
const paymentMethodListApi = (
  payload: models.ListProcessProps<models.PaymentMethodProps>,
) => {
  const path = `payment-method-types?skip=${payload.skip}&limit=${payload.limit}&keyword=${payload.keyword}&sort=${payload.sort}&sortBy=${payload.sortBy}&amount=${payload.amount}`;
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
  const path = `create-order`;
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
// const useCheckDataOrder = (orderId: string) => {
//   const dispatch = useDispatch();
//   const order = database()
//     .ref(`order/95`)
//     .on('value', (querySnapshot) => {
//       let data = querySnapshot.val();
//       let dataItem = { ...data };
//       dispatch(ActionCreators.isOrderRTDBChange({ dataItem }));
//     });
//   return () => database().ref(`order/${orderId}`).off('value', order);
// };
const useCheckDataOrder = (orderId: string) => {
  // const dispatch = useDispatch();
  const order = database()
    .ref(`order/95`)
    .on('value', (querySnapshot) => {
      let data = querySnapshot.val();
      let dataItem = { ...data };
      ActionCreators.isOrderRTDBChange({ dataItem });
    });
  return () => database().ref(`order/${orderId}`).off('value', order);
};

/** === EXPORT FUNCTIONS === */
export const PaymentMethodListApi = {
  paymentMethodListApi,
  paymentMethodGetWaitingPaymentOrderApi,
  paymentMethodCreateOrdertApi,
  useCheckDataOrder,
};
