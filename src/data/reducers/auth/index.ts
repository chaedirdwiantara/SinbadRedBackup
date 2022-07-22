import { combineReducers } from 'redux';
import { checkEmailAvailability } from './check-email.reducer';
import { verifyOTP } from './verify-otp.reducer';
import { requestOTP } from './request-otp.reducer';
import { AuthMeReducer } from './auth-me.reducer';
import { checkPhoneV2 } from './check-phone-v2.reducer';
import { checkAutoLoginData } from './check-auto-login.reducer';
import { checkPhoneRegisterV3 } from './check-phone-register-v3.reducer';
import { userMedeaData } from './user-medea-data.reducer';

export const auth = combineReducers({
  checkEmailAvailability,
  verifyOTP,
  requestOTP,
  AuthMeReducer,
  checkPhoneV2,
  checkAutoLoginData,
  checkPhoneRegisterV3,
  userMedeaData,
});
