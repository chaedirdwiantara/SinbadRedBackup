import { combineReducers } from 'redux';
import { checkPhoneNoAvailability } from './check-phone.reducer';
import { checkEmailAvailability } from './check-email.reducer';
import { loginUsername } from './login-id.reducer';
import { registerData } from './register-data.reducer';
import { verifyOTP } from './verify-otp.reducer';
import { requestOTP } from './request-otp.reducer';

export const auth = combineReducers({
  checkPhoneNoAvailability,
  loginUsername,
  checkEmailAvailability,
  registerData,
  verifyOTP,
  requestOTP,
});
