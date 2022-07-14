/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
/** === IMPORT EXTERNAL FUNCTION === */
import { useAuthCoreAction } from '@core/functions/auth';
import { useDataAuth } from '@core/redux/Data';
import { NavigationAction } from '@navigation';
import { useOTP } from '@screen/auth/functions';
import { useCheckForceUpdateVersion } from '@core/functions/firebase/flag-rtdb.function';
import { useSetUpdateAvailable } from '../functions';
/** === COMPONENT === */
const IntroSplashView: React.FC = () => {
  const { meV2 } = useDataAuth();
  const { getLocationPermissions } = useOTP();
  const { setUpdateAvailable } = useSetUpdateAvailable();
  /** === HOOK === */
  /** => this for save versionCode force update */
  useCheckForceUpdateVersion();
  /** => this for save update availabale */
  setUpdateAvailable();
  const authCoreAction = useAuthCoreAction();
  /** === EFFECT === */
  /** => get auth me */
  React.useEffect(() => {
    authCoreAction.me();
    authCoreAction.meV2();
  }, []);

  React.useEffect(() => {
    if (meV2.data && !meV2.loading) {
      if (meV2.data?.data?.isBuyerCategoryCompleted) {
        setTimeout(() => {
          NavigationAction.resetToHome();
          SplashScreen.hide();
        }, 100);
      } else {
        getLocationPermissions();
        setTimeout(() => {
          SplashScreen.hide();
        }, 100);
      }
    } else if ((!meV2.data || meV2.error) && !meV2.loading) {
      setTimeout(() => {
        NavigationAction.resetToIntroSinbad();
        SplashScreen.hide();
      }, 100);
    }
  }, [meV2]);
  /** === VIEW === */
  /** => main */
  return null;
};

export default IntroSplashView;
/**
 * ================================================================
 * NOTES
 * ================================================================
 * createdBy: hasapu (team)
 * createDate: 01022021
 * updatedBy: -
 * updatedDate: -
 * updatedFunction/Component:
 * -> NaN (no desc)
 * -> NaN (no desc)
 */
