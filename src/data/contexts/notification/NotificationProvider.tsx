import React from 'react';
import {
  NotificationContext,
  notificationReducer,
  notificationInitialState,
} from './notification.context';

const NotificationProvider: React.FC = ({ children }) => {
  const [stateNotification, dispatchNotification] = React.useReducer(
    notificationReducer,
    notificationInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateNotification,
      dispatchNotification,
    }),
    [stateNotification, dispatchNotification],
  );
  return (
    <NotificationContext.Provider value={valueProvider}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
