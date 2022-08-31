/** === IMPORT PACKAGE HERE === */
import React from 'react';
import messaging from '@react-native-firebase/messaging';
import { useDispatch } from 'react-redux';
import * as CoreAction from '../data/actions';
import SplashScreen from 'react-native-splash-screen';
import { NavigationAction } from '@navigation';
import { isEmpty } from 'lodash';
import PushNotifications, { Importance } from 'react-native-push-notification';
import { useDataAuth } from '@core/redux/Data';
import {
  useNotificationAction,
  useNotificationTotalActions,
} from '@screen/notification/functions';
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
  const dispatch = useDispatch();
  const notificationTotalActions = useNotificationTotalActions();
  const { onDispatchReadFromDrawer } = useNotificationAction();
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
          dispatch(CoreAction.notificationQuit(true));
          NavigationAction.resetToHome();
          setTimeout(() => {
            deepLink(remoteMessage?.data);
          }, 1000);
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
        SplashScreen.hide();
        const payload = JSON.parse(data.payload);
        onDispatchReadFromDrawer(payload?.notificationId ?? '');
        switch (data?.screen) {
          case 'HomeView':
          case 'HistoryListView':
            NavigationAction.goToMenu(data?.screen, payload);
            break;
          case 'HelpView':
          case 'UserView':
            NavigationAction.goToMenu(data?.screen, payload);
            break;
          default:
            NavigationAction.navigate(data?.screen, payload);
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
