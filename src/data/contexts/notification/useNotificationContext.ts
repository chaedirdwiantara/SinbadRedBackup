import { useContext } from 'react';

import { NotificationContext } from './notification.context';

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  if (context === undefined) {
    throw new Error(
      'useNotificationContext was used outside of ShopingCartProvider',
    );
  }

  return context;
};
