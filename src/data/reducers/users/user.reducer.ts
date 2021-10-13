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
/** === TYPE HERE === */
export type UserInitialProps = models.DetailProps<models.StoreDetail> &
  models.UpdateProps;
/** === INITIAL HERE === */
export const userInitialState = {
  detail: userDetailInitialState,
  update: changePasswordInitialState,
};
/** === EXPORT ALL HERE === */
export const userReducer = ({ detail, update }: any, action: any) => ({
  detail: userDetailReducer(detail, action),
  update: changePasswordReducer(update, action),
});
