/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMappingV3';
import apiMappingMock from '@core/services/apiMappingMockV3';
import * as models from '@models';
/** === FUNCTION === */
const checkoutTncApi = (data: models.DetailProcessProps) => {
  const path = `contents/${data.id}`;
  return apiMapping<models.CheckoutTnc>(
    'auth',
    path,
    'buyer-payment',
    'v1',
    'DETAIL'
  );
};
/** === MOCK API === */
// const checkoutTncApi = (data: models.DetailProcessProps) => {
//   const mockHost = "http://bfd413ce-2c3b-40cd-a117-4de5e98622a0.mock.pstmn.io"
//   const path = `contents/${data.id}`;
//   return apiMappingMock<models.CheckoutTnc>(
//     mockHost,
//     path,
//     'order',//not used in apiMock but must filled
//     'v1',
//     'DETAIL'
//   )
// }
/** === EXPORT FUNCTIONS === */
export const CheckoutTncApi = {
  checkoutTncApi,
};