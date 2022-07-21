/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMapping';
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
/** => check sinbad voucher */
const checkSinbadVoucher = () => {
  const path = 'sinbad-vouchers/check-sinbad-voucher';
  return apiMapping<models.CheckSinbadVoucherResponse>(
    'auth',
    path,
    'voucher',
    'v1',
    'CREATE',
  );
};
/** === EXPORT FUNCTIONS === */
export const VoucherApi = {
  voucherCartList,
  voucherDetail,
  countAllVoucher,
  checkSinbadVoucher,
};
