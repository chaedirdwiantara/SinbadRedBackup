import * as types from '@types';
import * as models from '@models';
/** === AUTH ME === */
/** => process */
export const authMeProcess = (): models.AuthMeProcessAction => {
  return { type: types.AUTH_ME_PROCESS };
};
/** => success */
export const authMeSuccess = (
  payload: models.AuthMeSuccess,
): models.AuthMeSuccessAction => {
  return { type: types.AUTH_ME_SUCCESS, payload };
};
/** => failed */
export const authMeFailed = (
  payload: models.ErrorProps,
): models.AuthMeFailedAction => {
  return { type: types.AUTH_ME_FAILED, payload };
};
