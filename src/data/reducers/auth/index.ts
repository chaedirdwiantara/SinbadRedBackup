import { combineReducers } from 'redux';
import { checkEmailAvailability } from './check-email.reducer';
import { checkPhoneV2 } from './check-phone-v2.reducer';
import { checkAutoLoginData } from './check-auto-login.reducer';
import { checkPhoneRegisterV3 } from './check-phone-register-v3.reducer';
import { userMedeaData } from './user-medea-data.reducer';
import { verifyOTP } from './verify-otp.reducer';

export const auth = combineReducers({
  checkEmailAvailability,
  checkPhoneV2,
  checkAutoLoginData,
  checkPhoneRegisterV3,
  userMedeaData,
  verifyOTP
});
