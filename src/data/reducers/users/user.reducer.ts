/** === IMPORT HERE === */
// import * as models from '@models';
import {
  userDetailReducer,
  userDetailInitialState,
} from './user-detail.reducer';
import {
  changePasswordReducer,
  changePasswordInitialState,
} from './user-change-password.reducer';
/** === TYPE HERE === */
// export type UserInitialProps = models.DetailProps<models.StoreDetail>;
/** === INITIAL HERE === */
export const userInitialState = {
  detail: userDetailInitialState,
  changePassword: changePasswordInitialState,
};
/** === EXPORT ALL HERE === */
export const userReducer = ({ detail, changePassword }: any, action: any) => ({
  detail: userDetailReducer(detail, action),
  changePassword: changePasswordReducer(changePassword, action),
});
