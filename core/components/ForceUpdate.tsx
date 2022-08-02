/** === IMPORT PACKAGE HERE === */
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { buildNumber } from '@core/functions/global/device-data';
import { useDataPermanent } from '@core/redux/Data';
import { NavigationAction } from '@navigation';
import { Update } from '@core/functions/global/updateApp/UpdateModule';
/** === INTERFACE === */
interface RemoteMessage {
  payload: string;
  screen: string;
}
/** === COMPONENT === */
const ForceUpdate = () => {
  /** === HOOK === */
  const data = useDataPermanent();
  /** === EFFECT === */
  React.useEffect(() => {
    if (parseInt(buildNumber, 10) < data.forceUpdateVersion) {
      Update().checkAppUpdate((isUpdateAvailble: boolean) => {
        if (isUpdateAvailble) {
          SplashScreen.hide();
          NavigationAction.resetToForceUpdate();
        }
      });
    }
  }, [data.forceUpdateVersion]);

  return null;
};
/** === EXPORT COMPONENT === */
export default ForceUpdate;
