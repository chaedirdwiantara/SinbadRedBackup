/** === IMPORT EXTERNAL FUNCTION === */
import apiMappingMock from '@core/services/apiMappingMock';
import * as models from '@models';
/** => voucher detail */
const voucherDetail = (data: models.DetailProcessProps) => {
  const mockHost = 'https://690d9a8b-8da9-4142-b577-d543b2682e7f.mock.pstmn.io';
  const path = `voucher-cart-list/${data.id}`;
  return apiMappingMock<models.VoucherDetailProps>(
    mockHost,
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};

/** === EXPORT FUNCTIONS === */
export const VoucherApi = {
  voucherDetail,
};
