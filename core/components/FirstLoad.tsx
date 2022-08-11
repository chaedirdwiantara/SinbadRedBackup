/** === IMPORT PACKAGE HERE === */
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { buildNumber } from '@core/functions/global/device-data';
import { useDataPermanent, useDataUpdateApp } from '@core/redux/Data';
import { NavigationAction } from '@navigation';
/** === COMPONENT === */
const FirstLoad = () => {
  /** === HOOK === */
  const data = useDataPermanent();
  const dataUpdateApp = useDataUpdateApp();
  /** === EFFECT === */
  React.useEffect(() => {
    /** ==> this for force update */
    if (parseInt(buildNumber, 10) < data.forceUpdateVersion) {
      if (dataUpdateApp) {
        SplashScreen.hide();
        NavigationAction.resetToForceUpdate();
      }
    } else {
      /** ==> this for maintenance */
      /** ==> check if maintenance mode true */
      if (data.maintenance) {
        SplashScreen.hide();
        NavigationAction.resetToMaintenance();
      } else {
        NavigationAction.restartApp();
      }
    }
  }, [data.forceUpdateVersion, data.maintenance, dataUpdateApp]);
  /** === VIEW === */
  return null;
};
/** === EXPORT COMPONENT === */
export default FirstLoad;
