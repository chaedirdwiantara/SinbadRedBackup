import * as types from '@types';
import * as models from '@models';
import { DataSuccessUpdateV2Props } from '@models';
/** => update visibility voucher process */
export const updateVisibilityVoucherProcess = (
  contextDispatch: (action: any) => any,
  data: models.VoucherUpdateVisibilityProps,
): models.UpdateProcessAction<models.VoucherUpdateVisibilityProps> => {
  contextDispatch({ type: types.UPDATE_VISIBILITY_VOUCHER_PROCESS });
  return {
    type: types.UPDATE_VISIBILITY_VOUCHER_PROCESS,
    payload: { data: data },
    contextDispatch,
  };
};
/** => update visibility voucher success */
export const updateVisibilityVoucherSuccess = (
  data: models.UpdateSuccessV3Props<DataSuccessUpdateV2Props>,
): models.UpdateSuccessV3Action<DataSuccessUpdateV2Props> => {
  return { type: types.UPDATE_VISIBILITY_VOUCHER_SUCCESS, payload: data };
};
/** => update visibility voucher failed */
export const updateVisibilityVoucherFailed = (
  data: models.ErrorProps,
): models.UpdateFailedAction => {
  return { type: types.UPDATE_VISIBILITY_VOUCHER_FAILED, payload: data };
};
/** => update visibility voucher reset */
export const updateVisibilityVoucherReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.UPDATE_VISIBILITY_VOUCHER_RESET });
  return { type: types.UPDATE_VISIBILITY_VOUCHER_RESET };
};
