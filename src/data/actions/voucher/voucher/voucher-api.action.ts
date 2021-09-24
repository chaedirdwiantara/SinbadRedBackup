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
