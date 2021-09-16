import { combineReducers } from 'redux';
import { checkPhoneNoAvailability } from './check-phone.reducer';
import { loginUsername } from './login-id.reducer';

export const auth = combineReducers({
  checkPhoneNoAvailability,
  loginUsername,
});
