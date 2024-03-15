/** === IMPORT HERE === */
import {
  userDetailReducer,
  userDetailInitialState,
} from './user-detail.reducer';
import {
  changePasswordReducer,
  changePasswordInitialState,
} from './user-change-password.reducer';
import {
  profileEditReducer,
  profileEditInitialState,
} from './profile-edit.reducer';
import {
  updateBadgeProfileReducer,
  updateBadgeProfileInitialState,
} from './update-badge-profile.reducer';
/** === TYPE HERE === */
// export type UserInitialProps = models.DetailProps<models.StoreDetail> &
//   models.UpdateProps;

/** === INITIAL HERE === */
export const userInitialState = {
  detail: userDetailInitialState,
  update: changePasswordInitialState,
  profileEdit: profileEditInitialState,
  updateBadgeProfile: updateBadgeProfileInitialState,
};
/** === EXPORT ALL HERE === */
export const userReducer = (
  { detail, update, profileEdit, updateBadgeProfile }: any,
  action: any,
) => ({
  detail: userDetailReducer(detail, action),
  update: changePasswordReducer(update, action),
  profileEdit: profileEditReducer(profileEdit, action),
  updateBadgeProfile: updateBadgeProfileReducer(updateBadgeProfile, action),
});
