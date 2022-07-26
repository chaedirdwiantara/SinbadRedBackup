/** === IMPORT PACKAGE HERE === */
import React from 'react';
import messaging from '@react-native-firebase/messaging';
import { NavigationAction } from '@navigation';
import { isEmpty } from 'lodash';
import PushNotifications, { Importance } from 'react-native-push-notification';
import { useDataAuth } from '@core/redux/Data';
import { useNotificationTotalActions } from '@screen/notification/functions';
import { colorV2 } from '@sinbad/react-native-sinbad-ui';
/** === INTERFACE === */
interface RemoteMessage {
  payload: string;
  screen: string;
}
/** === COMPONENT === */
const PushNotification = () => {
  /** === HOOK === */
  const { me } = useDataAuth();
  const notificationTotalActions = useNotificationTotalActions();
  /** === ACTION FOR FOREGROUND === */
  PushNotifications.configure({
    onNotification: function (notification) {
      if (notification.data.data) {
        deepLink(notification.data.data);
      }
    },
    popInitialNotification: true,
  });
  /** === CREATE CHANNEL === */
  PushNotifications.createChannel(
    {
      channelId: 'sinbad_red',
      channelName: 'Sinbad Red',
      playSound: true,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    },
    () => {},
  );
  /** === EFFECT === */
  React.useEffect(() => {
    /** === FOR FOREGROUND === */
    const unSubForeground = messaging().onMessage(async (remoteMessage) => {
      getTotalNotifBE();
      localNotification(remoteMessage);
    });
    /** === FOR BACKGROUND AND QUIT === */
    const unSubBackground = messaging().setBackgroundMessageHandler(
      async () => {
        getTotalNotifBE();
      },
    );
    /** === FOR BACKGROUND OPEN === */
    const unSubBackgroundOpen = messaging().onNotificationOpenedApp(
      async (remoteMessage) => {
        deepLink(remoteMessage.data);
      },
    );
    /** === FOR BACKGROUND QUIT OPEN === */
    const unSubBackgroundQuitOpen = messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage !== null) {
          deepLink(remoteMessage?.data);
        }
      });

    return () => {
      unSubForeground;
      unSubBackground;
      unSubBackgroundOpen;
      unSubBackgroundQuitOpen;
    };
  }, []);

  /** === LOCAL NOTIFICATION === */
  const localNotification = (remoteMessage: any) => {
    PushNotifications.localNotification({
      channelId: 'sinbad_red',
      message: remoteMessage.notification?.body!,
      title: remoteMessage.notification?.title!,
      largeIcon: '',
      largeIconUrl: remoteMessage.notification?.android?.imageUrl ?? '',
      color: colorV2.primary.red50,
      smallIcon: 'ic_stat_notif',
      userInfo: remoteMessage,
    });
  };
  /** === DEEP LINK === */
  const deepLink = (data: any) => {
    if (!isEmpty(data)) {
      if (data?.screen !== undefined) {
        switch (data?.screen) {
          case 'HomeView':
          case 'HistoryListView':
            NavigationAction.goToMenu(data?.screen, JSON.parse(data.payload));
            break;
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
  /** === GET TOTAL NOTIF FROM BE === */
  const getTotalNotifBE = () => {
    if (me.data !== null) {
      notificationTotalActions.fetch();
    }
  };
  return null;
};
/** === EXPORT COMPONENT === */
export default PushNotification;
