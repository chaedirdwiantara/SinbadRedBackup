import { combineReducers } from 'redux';
import { updateUserMedeaData } from './update_user_medea_data.reducer';

export const register = combineReducers({
  updateUserMedeaData,
});
