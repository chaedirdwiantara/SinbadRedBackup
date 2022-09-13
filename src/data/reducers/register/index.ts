import { combineReducers } from 'redux';
import { updateUserMedeaData } from './update_user_medea_data.reducer';
import { checkReferralCodeData } from './check-referral-code.reducer';

export const register = combineReducers({
  updateUserMedeaData,
  checkReferralCodeData,
});
