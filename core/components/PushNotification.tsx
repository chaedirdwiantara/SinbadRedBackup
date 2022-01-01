/** === IMPORT PACKAGE HERE === */
import React from 'react';
import messaging from '@react-native-firebase/messaging';
import { NavigationAction } from '@navigation';
import { isEmpty } from 'lodash';
import PushNotifications from 'react-native-push-notification';
/** === INTERFACE === */
interface RemoteMessage {
  payload: string;
  screen: string;
}
/** === COMPONENT === */
const PushNotification = () => {
  /** === ACTION FOR FOREGROUND === */
  PushNotifications.configure({
    onNotification: function (notification) {
      if (notification.data.data) {
        deepLink(notification.data.data);
      }
    },
    popInitialNotification: true,
  });
  /** === EFFECT === */
  React.useEffect(() => {
    /** === FOR FOREGROUND === */
    const unSubForeground = messaging().onMessage(async (remoteMessage) => {
      PushNotifications.localNotification({
        message: remoteMessage.notification?.body!,
        title: remoteMessage.notification?.title!,
        largeIcon: '',
        smallIcon: 'ic_stat_notif',
        userInfo: remoteMessage,
      });
    });
    /** === FOR BACKGROUND === */
    const unSubBackground = messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        deepLink(remoteMessage.data);
      },
    );
    return () => {
      unSubForeground;
      unSubBackground;
    };
  }, []);

  const deepLink = (data: any) => {
    if (!isEmpty(data)) {
      if (data?.screen !== undefined) {
        switch (data?.screen) {
          case 'HomeView':
          case 'HistoryListView':
          case 'HelpView':
          case 'UserView':
            NavigationAction.goToMenu(data?.screen, JSON.parse(data.payload));
            break;
          default:
            NavigationAction.navigate(data?.screen, JSON.parse(data.payload));
            break;
        }
      } else {
        NavigationAction.resetToHome();
      }
    } else {
      NavigationAction.resetToHome();
    }
  };

  return null;
};
/** === EXPORT COMPONENT === */
export default PushNotification;
