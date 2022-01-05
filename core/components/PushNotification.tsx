/** === IMPORT PACKAGE HERE === */
import React from 'react';
import messaging from '@react-native-firebase/messaging';
import { NavigationAction } from '@navigation';
import { isEmpty } from 'lodash';
import { SnbToast } from 'react-native-sinbad-ui';
/** === INTERFACE === */
interface RemoteMessage {
  payload: string;
  screen: string;
}
/** === COMPONENT === */
const PushNotification = () => {
  /** === REF === */
  const notif = React.useRef<any>();
  /** === STATE === */
  const [title, setTitle] = React.useState<string | undefined>('');
  const [body, setBody] = React.useState<string | undefined>('');
  /** === EFFECT === */
  React.useEffect(() => {
    /** === FOR FOREGROUND === */
    const unSubForeground = messaging().onMessage(async (remoteMessage) => {
      setTitle(remoteMessage.notification?.title);
      setBody(remoteMessage.notification?.body);
      notif.current.show();
    });
    /** === FOR BACKGROUND === */
    const unSubBackground = messaging().setBackgroundMessageHandler(
      async (remoteMessage) => {
        const remoteMsg = remoteMessage.data;
        if (!isEmpty(remoteMsg)) {
          if (remoteMsg?.screen !== undefined) {
            switch (remoteMsg?.screen) {
              case 'HomeView':
              case 'HistoryListView':
              case 'HelpView':
              case 'UserView':
                NavigationAction.goToMenu(
                  remoteMsg?.screen,
                  JSON.parse(remoteMsg.payload),
                );
                break;
              default:
                NavigationAction.navigate(
                  remoteMsg?.screen,
                  JSON.parse(remoteMsg.payload),
                );
                break;
            }
          } else {
            NavigationAction.resetToHome();
          }
        } else {
          NavigationAction.resetToHome();
        }
      },
    );
    return () => {
      unSubForeground;
      unSubBackground;
    };
  }, []);

  return (
    <SnbToast
      ref={notif}
      position="top"
      duration={5000}
      positionValue={20}
      message={`${title}\n${body}`}
    />
  );
};
/** === EXPORT COMPONENT === */
export default PushNotification;
