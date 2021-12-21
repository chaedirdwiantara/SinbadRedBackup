import { createContext, Dispatch } from 'react';

import {
  NotificationState,
  notificationInitialState,
  notificationReducer,
} from '@reducer/notification/notification.reducer';

const NotificationContext = createContext<{
  // state: InitialStateType;
  stateNotification: NotificationState;
  dispatchNotification: Dispatch<any>;
}>({
  // state: initialState,
  stateNotification: notificationInitialState,
  dispatchNotification: () => null,
});

export { NotificationContext, notificationReducer, notificationInitialState };
