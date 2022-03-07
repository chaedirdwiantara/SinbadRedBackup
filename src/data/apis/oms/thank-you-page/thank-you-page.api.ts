/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
const thankYouPageOrderDetail = (id : string) => {
  const path = `orders/${id}`;
  return apiMapping<models.ThankYouOrderDetailProps>(
    'auth',
    path,
    'order',
    'v1',
    'DETAIL'
  );
};
/** === EXPORT FUNCTIONS === */
export const ThankYouPageApi = {
  thankYouPageOrderDetail,
};