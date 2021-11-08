import React from 'react';
import {
  NotificationInitialProps,
  notificationInitialState,
  notificationReducer,
} from '@reducer/notification/notification.reducer';

const NotificationContext = React.createContext<{
  // state: InitialStateType;
  stateNotification: NotificationInitialProps;
  dispatchNotification: React.Dispatch<any>;
}>({
  // state: initialState,
  stateNotification: notificationInitialState,
  dispatchNotification: () => null,
});

export { NotificationContext, notificationReducer, notificationInitialState };
