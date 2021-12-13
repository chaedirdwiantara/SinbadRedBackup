/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import * as models from '@models';
/** === FUNCTION === */
/** => verfication order create */
const verficationOrderCreate = (data: {}) => {
  const path = 'potential-discount';
  return apiMapping('auth', path, 'discount', 'v1', 'CREATE', data);
};
/** => verfication order detail */
const verficationOrderDetail = (data: models.DetailProcessProps) => {
  const path = `potential-discount/${data.id}`;
  return apiMapping<models.VerificationOrderDetailProps>(
    'auth',
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};
/** === EXPORT FUNCTIONS === */
export const VerificationOrderApi = {
  verficationOrderCreate,
  verficationOrderDetail,
};
