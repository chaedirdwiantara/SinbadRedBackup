/** === IMPORT EXTERNAL FUNCTION === */
import apiMapping from '@core/services/apiMappingV3';
import * as models from '@models';
/** === FUNCTION === */
/** => voucher detail */
const voucherDetail = (data: models.VoucherDetailProcessProps) => {
  const path = `sinbad-vouchers/${data.id}`;
  return apiMapping<models.VoucherCartDetailProps>(
    'auth',
    path,
    'voucher',
    'v1',
    'DETAIL',
  );
};
/** => voucher cart list */
const voucherCartList = ({
  totalOrder,
  ...other
}: models.VoucherListProcessProps) => {
  const path = other?.uniqueCode
    ? `sinbad-vouchers?totalOrder=${totalOrder}&uniqueCode=${other?.uniqueCode}`
    : `sinbad-vouchers?totalOrder=${totalOrder}`;
  return apiMapping<models.VoucherCartListProps>(
    'auth',
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
    'v2',
    'CREATE',
    data,
  );
};
/** => cancel reserve voucher */
const cancelVoucher = () => {
  const path = 'sinbad-vouchers/cancel-reserve-voucher';
  return apiMapping<models.DeleteItemV3Props>(
    'auth',
    path,
    'voucher',
    'v1',
    'DELETE',
  );
};

/** => update voucher visibility */
const updateVisibilityVoucher = ({
  id,
}: models.VoucherUpdateVisibilityProps) => {
  const path = `sinbad-vouchers/sinbad-voucher-visibility/${id}`;
  return apiMapping<models.UpdateItemV2Props>(
    'auth',
    path,
    'voucher',
    'v1',
    'UPDATE',
    {
      isVisible: true,
    },
  );
};

/** === EXPORT FUNCTIONS === */
export const VoucherApi = {
  voucherCartList,
  voucherDetail,
  checkSinbadVoucher,
  cancelVoucher,
  updateVisibilityVoucher,
};
