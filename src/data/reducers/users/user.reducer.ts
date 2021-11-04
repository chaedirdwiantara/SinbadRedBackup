/** === IMPORT HERE === */
import * as models from '@models';
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
/** === TYPE HERE === */
export type UserInitialProps = models.DetailProps<models.StoreDetail> &
  models.UpdateProps;
/** === INITIAL HERE === */
export const userInitialState = {
  detail: userDetailInitialState,
  update: changePasswordInitialState,
  profileEdit: profileEditInitialState,
};
/** === EXPORT ALL HERE === */
export const userReducer = (
  { detail, update, profileEdit }: any,
  action: any,
) => ({
  detail: userDetailReducer(detail, action),
  update: changePasswordReducer(update, action),
  profileEdit: profileEditReducer(profileEdit, action),
});
