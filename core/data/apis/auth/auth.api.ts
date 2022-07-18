/** === IMPORT EXTERNAL FUNCTION === */
import apiAuth from '../../../services/apiAuth';
import apiGeneral from '../../../services/apiGeneral';
import * as models from '@models';
/** === FUNCTION === */
/** => login with username and password */
const loginUserName = (data: models.LoginUserName) => {
  const path = 'login';
  return apiAuth<models.LoginSuccess>(path, 'v1', 'POST', data);
};
/** => check phone */
const checkPhoneLogin = (data: models.ICheckPhoneLogin) => {
  const path = 'login/check-phone';
  return apiAuth<models.ICheckPhoneLoginSuccess>(path, 'v2', 'POST', data);
};

/** => request OTP */
const requestOTP = (data: models.OtpRequest) => {
  const path = 'send-otp';
  return apiAuth<models.OtpGetSuccess>(path, 'v1', 'POST', data);
};
/** => verification OTP */
const verificationOTP = (data: models.LoginPhoneNumber) => {
  const path = 'otp/verification';
  return apiAuth<models.LoginSuccess>(path, 'v1', 'POST', data);
};
/** => me */
const me = () => {
  const path = 'me';
  return apiAuth<models.AuthMeSuccess>(path, 'v1', 'GET');
};
/** => me V2 */
const meV2 = () => {
  const path = 'me';
  return apiAuth<models.AuthMeSuccess>(path, 'v2', 'GET');
};
/** => logout */
const logout = () => {
  const path = 'logout';
  return apiGeneral<models.LogoutSuccess>('auth', path, 'auth', 'v1', 'POST');
};

/** === EXPORT FUNCTIONS === */
export const AuthApi = {
  loginUserName,
  requestOTP,
  verificationOTP,
  me,
  logout,
  meV2,
  checkPhoneLogin
};
