import * as types from '@types';
import * as models from '@models';
/** === DETAIL === */
/** => voucher detail process */
export const voucherDetailProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types, payload: data });
  return {
    type: types.VOUCHER_DETAIL_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => voucher detail success */
export const voucherDetailSuccess = (
  data: models.DetailSuccessProps<models.VoucherDetailProps>,
): models.DetailSuccessAction<models.VoucherDetailProps> => {
  return { type: types.VOUCHER_DETAIL_SUCCESS, payload: data };
};
/** => voucher detail failed */
export const voucherDetailFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.VOUCHER_DETAIL_FAILED, payload: data };
};
/** => voucher detail reset */
export const voucherDetailReset = () => {
  return { type: types.VOUCHER_DETAIL_RESET };
};
/** === LIST === */
/** => voucher cart list process */
export const voucherCartListProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types, payload: data });
  return {
    type: types.VOUCHER_CART_LIST_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => voucher cart list success */
export const voucherCartListSuccess = (
  data: models.DetailSuccessProps<models.VoucherCartListProps>,
): models.DetailSuccessAction<models.VoucherCartListProps> => {
  return { type: types.VOUCHER_CART_LIST_SUCCESS, payload: data };
};
/** => voucher cart list failed */
export const voucherCartListFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.VOUCHER_CART_LIST_FAILED, payload: data };
};
/** => voucher cart list reset */
export const voucherCartListReset = () => {
  return { type: types.VOUCHER_CART_LIST_RESET };
};
/** === SAVE SELECTED VOUCHER (LOCAL DATA) === */
export const saveSelectedVouchers = (
  data: models.selectedVoucherDataProps | null,
) => {
  return { type: types.SAVE_SELECTED_VOUCHERS, payload: data };
};
