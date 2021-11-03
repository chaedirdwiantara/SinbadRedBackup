/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import apiMappingMock from '@core/services/apiMappingMock';
import * as models from '@models';
/** === FUNCTION === */
/** => verfication order create */
const verficationOrderCreate = (data: {}) => {
  const path = 'verification-order';
  return apiMapping('auth', path, 'discount', 'v1', 'CREATE', data);
};
/** => verfication order detail */
const verficationOrderDetail = (data: models.DetailProcessProps) => {
  const mockHost =
    'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io/';
  const path = `potensial-discount/${data.id}`;
  return apiMappingMock<models.VerificationOrderDetailProps>(
    mockHost,
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
