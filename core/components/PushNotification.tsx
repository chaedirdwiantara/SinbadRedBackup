/** === IMPORT PACKAGE HERE === */
import React from 'react';
import messaging from '@react-native-firebase/messaging';
import { NavigationAction } from '@navigation';
import { isEmpty } from 'lodash';
/** === INTERFACE === */
interface RemoteMessage {
  payload: string;
  screen: string;
}
/** === COMPONENT === */
const PushNotification = () => {
  /** === EFFECT === */
  React.useEffect(() => {
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
      unSubBackground;
    };
  }, []);
  return null;
};
/** === EXPORT COMPONENT === */
export default PushNotification;
