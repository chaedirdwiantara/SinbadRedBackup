/** === IMPORT HERE === */
import * as models from '@models';
import {
  userDetailReducer,
  userDetailInitialState,
} from './user-detail.reducer';
/** === TYPE HERE === */
export type UserInitialProps = models.DetailProps<models.StoreDetail>;
/** === INITIAL HERE === */
export const userInitialState = {
  detail: userDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const userReducer = ({ detail }: any, action: any) => ({
  detail: userDetailReducer(detail, action),
});
