import * as types from '@types';
import * as models from '@models';

/** === ACTION === */
/** => PROCESS */
export const checkSinbadVoucherProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<models.CheckSinbadVoucherPayload>,
): models.CreateProcessAction<models.CheckSinbadVoucherPayload> => {
  contextDispatch({
    type: types.CHECK_SINBAD_VOUCHER_PROCESS,
    payload: data,
  });
  return {
    type: types.CHECK_SINBAD_VOUCHER_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => SUCCESS */
export const checkSinbadVoucherSuccess = (
  data: models.CreateSuccessV3Props<models.CheckSinbadVoucherResponse>,
): models.CreateSuccessV3Action<models.CheckSinbadVoucherResponse> => {
  return { type: types.CHECK_SINBAD_VOUCHER_SUCCESS, payload: data };
};
/** => FAILED */
export const checkSinbadVoucherFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CHECK_SINBAD_VOUCHER_FAILED, payload: data };
};
/** => RESET */
export const checkSinbadVoucherReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.CHECK_SINBAD_VOUCHER_RESET });
  return { type: types.CHECK_SINBAD_VOUCHER_RESET };
};
