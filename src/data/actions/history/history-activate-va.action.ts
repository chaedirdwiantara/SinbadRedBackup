import * as types from '@types';
import * as models from '@models';
import { PaymentActivateVASuccess } from '@models';
/** === HISTORY ACTIVATE VA === */
/** => process */
export const historyActivateVAProcess = (
  contextDispatch: (action: any) => any,
  payload: models.UpdateProcessProps<PaymentActivateVASuccess>,
): models.UpdateProcessAction<PaymentActivateVASuccess> => {
  contextDispatch({
    type: types.HISTORY_ACTIVATE_VA_PROCESS,
    payload,
  });
  return {
    type: types.HISTORY_ACTIVATE_VA_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => success */
export const merchantEditSuccess = (
  data: models.UpdateSuccessProps,
): models.UpdateSuccessAction => {
  return { type: types.HISTORY_ACTIVATE_VA_SUCCESS, payload: data };
};
/** => failed */
export const merchantEditFailed = (
  data: models.ErrorProps,
): models.UpdateFailedAction => {
  return { type: types.HISTORY_ACTIVATE_VA_FAILED, payload: data };
};
