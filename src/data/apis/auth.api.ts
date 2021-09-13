/** === IMPORT EXTERNAL FUNCTION === */
import apiAuth from '@core/services/apiAuth';
import apiGeneral from '@core/services/apiGeneral';
import * as models from '@models';
/** === FUNCTION === */
/** => login with username and password */
const loginUserName = (data: models.LoginUserNameProps) => {
  const path = 'login';
  return apiAuth<models.LoginSuccessProps>(path, 'v1', 'POST', data);
};
/** => request OTP */
const requestOTP = (data: models.OtpRequestProps) => {
  const path = `otp/request-otp?mobilePhone=${data.mobilePhone}&type=login`;
  return apiAuth<models.OtpGetSuccessProps>(path, 'v1', 'POST', data);
};
/** => logout */
const logout = () => {
  const path = 'logout';
  return apiGeneral<models.LogoutSuccesProps>(path, 'auth', 'v1', 'POST');
};
/** === EXPORT FUNCTIONS === */
export const AuthApi = {
  loginUserName,
  requestOTP,
  logout,
};
