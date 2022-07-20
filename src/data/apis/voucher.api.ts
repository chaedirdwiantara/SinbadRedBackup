/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
import apiMappingMock from '@core/services/apiMappingMockV3';
import * as models from '@models';
/** === FUNCTION === */
/** => voucher detail */
const voucherDetail = (data: models.VoucherDetailProcessProps) => {
  const path = `voucher-cart-list/detail/${data.id}?type=${data.type}`;
  return apiMapping<models.VoucherDetailProps>(
    'auth',
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};
/** => voucher cart list */
const voucherCartList = () => {
  const path = 'voucher-cart-list';
  return apiMapping<models.VoucherCartListProps>(
    'auth',
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};
/** => count all voucher */
const countAllVoucher = () => {
  const path = 'voucher-cart-list/count';
  return apiMapping<models.CountAllVoucherProps>(
    'auth',
    path,
    'discount',
    'v1',
    'DETAIL',
  );
};
/** => cancel reserve voucher */
const cancelVoucher = () => {
  const path = 'voucher/cancel-reserve-voucher';
  const mockHost = 'https://fefad299-d7fa-4988-9f70-188fda3275e9.mock.pstmn.io';
  return apiMappingMock<models.DeleteItemV3Props>(
    mockHost,
    path,
    'voucher',
    'v1',
    'DELETE',
  );
};

// const cancelVoucher = () => {
//   const path = 'voucher/cancel-reserve-voucher';
//   return apiMapping('auth', path, 'warehouse', 'v1', 'DELETE');
// };

/** === EXPORT FUNCTIONS === */
export const VoucherApi = {
  voucherCartList,
  voucherDetail,
  countAllVoucher,
  cancelVoucher,
};
