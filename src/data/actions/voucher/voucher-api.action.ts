import * as types from '@types';
import * as models from '@models';
/** === DETAIL === */
/** => voucher detail process */
export const voucherDetailProcess = (
  contextDispatch: (action: any) => any,
  data: models.VoucherDetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types.VOUCHER_DETAIL_PROCESS, payload: data });
  return {
    type: types.VOUCHER_DETAIL_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => voucher detail success */
export const voucherDetailSuccess = (
  data: models.DetailSuccessProps<models.VoucherCartDetailProps>,
): models.DetailSuccessAction<models.VoucherCartDetailProps> => {
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
  data: models.VoucherListProcessProps,
): models.VoucherListProcessAction => {
  contextDispatch({ type: types.VOUCHER_CART_LIST_PROCESS, payload: data });
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
/** => cancel reserve voucher process */
export const cancelVoucherProcess = (
  contextDispatch: (action: any) => any,
): Omit<models.DeleteProcessAction, 'payload'> => {
  contextDispatch({ type: types.CANCEL_VOUCHER_PROCESS });
  return {
    type: types.CANCEL_VOUCHER_PROCESS,
    contextDispatch,
  };
};
/** => cancel reserve voucher success */
export const cancelVoucherSuccess = (
  data: models.DeleteSuccessV3Props,
): models.DeleteSuccessV3Action => {
  return { type: types.CANCEL_VOUCHER_SUCCESS, payload: data };
};
/** => cancel reserve voucher failed */
export const cancelVoucherFailed = (
  data: models.ErrorProps,
): models.DeleteFailedAction => {
  return { type: types.CANCEL_VOUCHER_FAILED, payload: data };
};
/** => cancel reserve voucher reset */
export const cancelVoucherReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.CANCEL_VOUCHER_RESET });
  return { type: types.CANCEL_VOUCHER_RESET };
};
