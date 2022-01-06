/** === IMPORT EXTERNAL FUNCTION === */
import apiAuth from '@core/services/apiAuth';
import * as models from '@models';
/** === FUNCTION === */
/** => login with username and password */
const loginUserName = (data: models.LoginUserName) => {
  const path = 'login';
  return apiAuth<models.LoginSuccess>(path, 'v1', 'POST', data);
};
/** => request OTP */
const requestOTP = (data: models.OtpRequest) => {
  const path = 'otp/request-otp';
  return apiAuth<models.OtpGetSuccess>(path, 'v1', 'POST', data);
};
/** => verification OTP */
const verificationOTP = (data: models.LoginPhoneNumber) => {
  const path = 'otp/verification';
  return apiAuth<models.LoginSuccess>(path, 'v1', 'POST', data);
};
/** => logout */
const logout = () => {
  const path = 'logout';
  return apiAuth<models.LogoutSuccess>(path, 'v1', 'POST');
};
/** => auth me */
const getAuthMe = () => {
  const path = 'me';
  return apiAuth<models.AuthMeSuccess>(path, 'v1', 'GET');
};

/** === EXPORT FUNCTIONS === */
export const AuthApi = {
  loginUserName,
  requestOTP,
  verificationOTP,
  logout,
  getAuthMe,
};
