/** === IMPORT PACKAGE HERE === */
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { buildNumber } from '@core/functions/global/device-data';
import { useDataPermanent } from '@core/redux/Data';
import { NavigationAction } from '@navigation';
import { Update } from '@core/functions/global/updateApp/UpdateModule';
import { usePrevious } from '@core/functions/hook/prev-value';
/** === COMPONENT === */
const FirstLoad = () => {
  /** === HOOK === */
  const data = useDataPermanent();
  const prevOffsetWidth = usePrevious(data.maintenance);
  /** === EFFECT === */
  React.useEffect(() => {
    /** ==> this for force update */
    if (parseInt(buildNumber, 10) < data.forceUpdateVersion) {
      Update().checkAppUpdate((isUpdateAvailble: boolean) => {
        if (isUpdateAvailble) {
          SplashScreen.hide();
          NavigationAction.resetToForceUpdate();
        }
      });
    } else {
      /** ==> this for maintenance */
      /** ==> check if maintenance mode true */
      if (data.maintenance) {
        SplashScreen.hide();
        NavigationAction.resetToMaintenance();
      } else {
        if (prevOffsetWidth) {
          /** => back to splash screen if maintenance mode false */
          NavigationAction.restartApp();
        }
      }
    }
  }, [data.forceUpdateVersion, data.maintenance]);
  /** === VIEW === */
  return null;
};
/** === EXPORT COMPONENT === */
export default FirstLoad;
