import { combineReducers } from 'redux';
import { profileEditReducer } from './profile-edit.reducer';
import { changePasswordReducer } from './user-change-password.reducer';
import { userDetailReducer } from './user-detail.reducer';
import { updateBadgeProfileReducer } from './update-badge-profile.reducer';

export const users = combineReducers({
  profileEditReducer,
  changePasswordReducer,
  userDetailReducer,
  updateBadgeProfileReducer,
});
