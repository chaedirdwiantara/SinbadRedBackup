import * as types from '@types';
import * as models from '@models';
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
  data: models.DetailSuccessProps<models.VoucherCartList>,
): models.DetailSuccessAction<models.VoucherCartList> => {
  return { type: types.VOUCHER_CART_LIST_SUCCESS, payload: data };
};
/** => voucher cart list failed */
export const voucherCartListFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.VOUCHER_CART_LIST_FAILED, payload: data };
};
