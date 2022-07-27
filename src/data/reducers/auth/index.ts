import { combineReducers } from 'redux';
import { checkPhoneNoAvailability } from './check-phone.reducer';
import { checkEmailAvailability } from './check-email.reducer';
import { verifyOTP } from './verify-otp.reducer';
import { register } from './register';
import { checkPhoneV2 } from './check-phone-v2.reducer';
import { checkAutoLoginData } from './check-auto-login.reducer';
import { checkPhoneRegisterV3 } from './check-phone-register-v3.reducer';
import { userMedeaData } from './user-medea-data.reducer';

export const auth = combineReducers({
  checkPhoneNoAvailability,
  checkEmailAvailability,
  verifyOTP,
  register,
  checkPhoneV2,
  checkAutoLoginData,
  checkPhoneRegisterV3,
  userMedeaData,
});
