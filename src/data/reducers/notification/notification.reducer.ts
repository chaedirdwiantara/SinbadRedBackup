/** === IMPORT HERE === */
import * as models from '@models';
import {
  notificationlistInitialState,
  notificationListReducer,
  NotificationListInitialProps,
} from './notification-list.reducer';
import {
  notificaitonTotalReducer,
  notificationTotalInitialState,
  NotificationTotalInitialProps,
} from './notification-total.reducer';
/** === TYPE HERE === */
export type NotificationInitialProps = models.ListProps<
  models.NotificationListSuccessProps[]
>;
export interface NotificationState {
  list: NotificationListInitialProps;
  total: NotificationTotalInitialProps;
}
/** === INITIAL HERE === */
export const notificationInitialState = {
  list: notificationlistInitialState,
  total: notificationTotalInitialState,
};
/** === EXPORT ALL HERE === */
export const notificationReducer = (
  { list, total }: NotificationState,
  action: any,
) => ({
  list: notificationListReducer(list, action),
  total: notificaitonTotalReducer(total, action),
});
