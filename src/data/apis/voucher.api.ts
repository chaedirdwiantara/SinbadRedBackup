/** === IMPORT EXTERNAL FUNCTION === */
import apiMappingMock from '@core/services/apiMappingMock';
import * as models from '@models';
/** === FUNCTION === */
/** => voucher cart list */
const voucherCartList = () => {
  const mockHost =
    'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io/';
  const path = 'api/v1/sinbad-app/voucher-cart-list';
  return apiMappingMock<models.VoucherCartList>(mockHost, path, 'LIST');
};
/** === EXPORT FUNCTIONS === */
export const VoucherApi = {
  voucherCartList,
};
