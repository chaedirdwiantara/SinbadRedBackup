import * as types from '@types';
import * as models from '@models';
/** === LOGIN WITH USERNAME === */
/** => login with username process */
export const loginUserNameProcess = (
  data: models.LoginUserNameProps,
): models.LoginUserNameProcessAction => {
  return { type: types.LOGIN_USERNAME_PROCESS, payload: data };
};

export const resetLoginUsername = () => {
  return { type: types.LOGIN_USERNAME_RESET };
};
/** => login with username success */
export const loginUserNameSuccess = (
  data: models.LoginSuccessProps,
): models.LoginUserNameSuccessAction => {
  return { type: types.LOGIN_USERNAME_SUCCESS, payload: data };
};
/** => login with username failed */
export const loginUserNameFailed = (
  data: models.ErrorProps,
): models.LoginUserNameFailedAction => {
  return { type: types.LOGIN_USERNAME_FAILED, payload: data };
};
/** === LOGOUT === */
/** => logout process */
export const logoutProcess = (): models.LogoutProcessAction => {
  return { type: types.LOGOUT_PROCESS };
};
/** => logout success */
export const logoutSuccess = (
  data: models.LogoutSuccesProps,
): models.LogoutSuccessAction => {
  return { type: types.LOGOUT_SUCCESS, payload: data };
};
/** => logout failed */
export const logoutFailed = (
  data: models.ErrorProps,
): models.LogoutFailedAction => {
  return { type: types.LOGOUT_FAILED, payload: data };
};
