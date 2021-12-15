import React, { FC, useReducer, useMemo } from 'react';
import {
  NotificationContext,
  notificationReducer,
  notificationInitialState,
} from './notification.context';

const NotificationProvider: FC = ({ children }) => {
  const [stateNotification, dispatchNotification] = useReducer(
    notificationReducer,
    notificationInitialState,
  );
  const contextValue = useMemo(
    () => ({
      stateNotification,
      dispatchNotification,
    }),
    [stateNotification, dispatchNotification],
  );
  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};

export { NotificationProvider, NotificationContext };
