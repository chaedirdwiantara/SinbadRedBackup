import * as types from '@types';
import * as models from '@models';
/** === HISTORY ACTIVATE VA === */
/** => process */
export const historyActivateVAProcess = (
  contextDispatch: (action: any) => any,
  payload: models.UpdateProcessProps<{}>,
): models.UpdateProcessAction<{}> => {
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
export const historyActivateVASuccess = (
  data: models.UpdateSuccessProps,
): models.UpdateSuccessAction => {
  return { type: types.HISTORY_ACTIVATE_VA_SUCCESS, payload: data };
};
/** => failed */
export const historyActivateVAFailed = (
  data: models.ErrorProps,
): models.UpdateFailedAction => {
  return { type: types.HISTORY_ACTIVATE_VA_FAILED, payload: data };
};
/** => reset */
export const historyActivateVAReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.HISTORY_ACTIVATE_VA_RESET });
  return {
    type: types.HISTORY_ACTIVATE_VA_RESET,
  };
};
