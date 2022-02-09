import { combineReducers } from 'redux';
import { checkPhoneNoAvailability } from './check-phone.reducer';
import { checkEmailAvailability } from './check-email.reducer';
import { loginUsername } from './login-id.reducer';
import { merchantData } from './register-data.reducer';
import { verifyOTP } from './verify-otp.reducer';
import { requestOTP } from './request-otp.reducer';
import { register } from './register';
import { AuthMeReducer } from './auth-me.reducer';
import { checkPhoneV2 } from './check-phone-v2.reducer';

export const auth = combineReducers({
  checkPhoneNoAvailability,
  loginUsername,
  checkEmailAvailability,
  merchantData,
  verifyOTP,
  requestOTP,
  register,
  AuthMeReducer,
  checkPhoneV2,
});
