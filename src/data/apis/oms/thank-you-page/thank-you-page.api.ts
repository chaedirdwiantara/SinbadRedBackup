/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import apiMappingMock from '@core/services/apiMappingMockV3';
import * as models from '@models';
/** === FUNCTION === */
// const thankYouPageOrderDetail = (id : string) => {
//   const path = `orders/${id}`;
//   return apiMapping<models.ThankYouOrderDetailProps>(
//     'auth',
//     path,
//     'order',
//     'v1',
//     'DETAIL'
//   );
// };
/** === MOCK API === */
const thankYouPageOrderDetail = (data: models.DetailProcessProps) => {
  const mockHost = "http://bfd413ce-2c3b-40cd-a117-4de5e98622a0.mock.pstmn.io"
  const path = `orders/${data.id}`;
  return apiMappingMock<models.ThankYouOrderDetailProps>(
    mockHost,
    path,
    'order',//not used in apiMock but must filled
    'v1',
    'DETAIL'
  )
}

/** === FUNCTION PAYMENT GUIDE LIST === */
// const thankYouPagePaymentGuideList = (
//   payload: models.ListProcessProps<models.PaymentGuideProps>,
// ) => {
//   const path = `payment-guides?paymentMethodId=${payload.paymentMethodId}&$limit=${payload.limit}&$skip=${payload.skip}`;
//   return apiMapping<models.PaymentGuideListItem[]>(
//     'auth',
//     path,
//     'order',
//     'v1',
//     'LIST',
//   );
// };
/** === MOCK API === */
const thankYouPagePaymentGuideList = (
  payload: models.ListProcessProps<models.PaymentGuideProps>
  ) => {
  const mockHost = "http://bfd413ce-2c3b-40cd-a117-4de5e98622a0.mock.pstmn.io"
  const path = `payment-guides?paymentMethodId=${payload.paymentMethodId}&$limit=${payload.limit}&$skip=${payload.skip}`;
  return apiMappingMock<models.PaymentGuideListItem[]>(
    mockHost,
    path,
    'order',//not used in apiMock but must filled
    'v1',
    'LIST'
  )
}
/** === EXPORT FUNCTIONS === */
export const ThankYouPageApi = {
  thankYouPageOrderDetail,
  thankYouPagePaymentGuideList
};