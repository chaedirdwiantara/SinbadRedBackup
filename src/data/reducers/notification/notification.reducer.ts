/** === IMPORT HERE === */
import * as models from '@models';
import {
  notificationlistInitialState,
  notificationListReducer,
} from './notification-list.reducer';
/** === TYPE HERE === */
export type NotificationInitialProps = models.ListProps<
  models.NotificationListSuccessProps[]
>;
/** === INITIAL HERE === */
export const notificationInitialState = {
  list: notificationlistInitialState,
};
/** === EXPORT ALL HERE === */
export const notificationReducer = ({ list }: any, action: any) => ({
  list: notificationListReducer(list, action),
});
