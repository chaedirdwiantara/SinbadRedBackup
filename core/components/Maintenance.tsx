/** === IMPORT PACKAGE HERE === */
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { useDataPermanent } from '@core/redux/Data';
import { NavigationAction } from '@navigation';
/** === INTERFACE === */
interface RemoteMessage {
  payload: string;
  screen: string;
}
/** === COMPONENT === */
const Maintenance = () => {
  /** === HOOK === */
  const data = useDataPermanent();
  /** === EFFECT === */
  React.useEffect(() => {
    if (data.maintenance) {
      SplashScreen.hide();
      NavigationAction.resetToMaintenance();
    } else {
      NavigationAction.restartApp();
    }
  }, [data.maintenance]);

  return null;
};
/** === EXPORT COMPONENT === */
export default Maintenance;
