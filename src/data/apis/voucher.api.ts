/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMappingV3';
import apiMappingMock from '@core/services/apiMappingMockV3';
import * as models from '@models';
/** === FUNCTION === */
/** => voucher detail */
const voucherDetail = (data: models.VoucherDetailProcessProps) => {
  const path = `sinbad-vouchers/${data.id}`;
  const mockHost = 'https://fefad299-d7fa-4988-9f70-188fda3275e9.mock.pstmn.io';
  return apiMappingMock<models.VoucherCartDetailProps>(
    mockHost,
    path,
    'voucher',
    'v1',
    'DETAIL',
  );
};
// const voucherDetail = (data: models.VoucherDetailProcessProps) => {
//   const path = `sinbad-voucher/${data.id}`;
//   return apiMapping<models.VoucherCartDetailProps>(
//     'auth',
//     path,
//     'voucher',
//     'v1',
//     'DETAIL',
//   );
// };
/** => voucher cart list */
const voucherCartList = ({
  totalOrder,
  ...other
}: models.VoucherListProcessProps) => {
  const path = other?.uniqueCode
    ? `sinbad-vouchers?totalOrder=${totalOrder}&uniqueCode=${other?.uniqueCode}`
    : `sinbad-vouchers?totalOrder=${totalOrder}`;
  const mockHost = 'https://fefad299-d7fa-4988-9f70-188fda3275e9.mock.pstmn.io';
  return apiMappingMock<models.VoucherCartListProps>(
    mockHost,
    path,
    'voucher',
    'v1',
    'LIST',
  );
};
/** => check sinbad voucher */
const checkSinbadVoucher = ({
  data,
}: models.CreateProcessProps<models.CheckSinbadVoucherPayload>) => {
  const path = 'sinbad-vouchers/check-sinbad-voucher';
  return apiMapping<models.CheckSinbadVoucherResponse>(
    'auth',
    path,
    'voucher',
    'v1',
    'CREATE',
    data,
  );
};
/** => cancel reserve voucher */
const cancelVoucher = () => {
  const path = 'sinbad-vouchers/cancel-reserve-voucher';
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
//   const path = 'sinbad-vouchers/cancel-reserve-voucher';
//   return apiMapping('auth', path, 'voucher', 'v1', 'DELETE');
// };

/** === EXPORT FUNCTIONS === */
export const VoucherApi = {
  voucherCartList,
  voucherDetail,
  checkSinbadVoucher,
  cancelVoucher,
};
