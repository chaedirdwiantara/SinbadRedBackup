/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
/** === IMPORT EXTERNAL FUNCTION === */
import { useDataAuth, useDataPermanent } from '@core/redux/Data';
import { useAuthCoreAction, useAdsID } from '@core/functions/auth';
import { useGetTokenNotLogin } from '@core/functions/firebase/get-fcm.function';
import { setFlagByDeviceId, useCheckBannedAccount } from '@core/functions/firebase/flag-rtdb.function';
import { NavigationAction } from '@navigation';
import { useOTP } from '@screen/auth/functions';
import {
  useCheckForceUpdateVersion,
  useCheckMaintenance,
} from '@core/functions/firebase/flag-rtdb.function';
import { useSetUpdateAvailable } from '../functions';
/** === COMPONENT === */
const IntroSplashView: React.FC = () => {
  const { meV2, me } = useDataAuth();
  const { maintenance, isBanned } = useDataPermanent();
  const { getLocationPermissions } = useOTP();
  const { setUpdateAvailable } = useSetUpdateAvailable();
  /** === HOOK === */
  /** => this for save versionCode force update */
  useCheckForceUpdateVersion();
  /** => this for check maintenance */
  useCheckMaintenance();
  /** => this for save update availabale */
  setUpdateAvailable();
  /** => this for check account is banned/not */
  useCheckBannedAccount();
  const authCoreAction = useAuthCoreAction();
  // this for google ads ID
  const useAdsIDAction = useAdsID();
  /** === EFFECT === */
  useGetTokenNotLogin();
  setFlagByDeviceId();
  /** => get auth me */
  React.useEffect(() => {
    useAdsIDAction.saveAdsID();
      authCoreAction.me();
      authCoreAction.meV2();
  }, []);

  React.useEffect(() => {
    if (maintenance) {
      setTimeout(() => {
        NavigationAction.resetToMaintenance();
        SplashScreen.hide();
      }, 100);
    } else {
      if (me.data && isBanned) {
        setTimeout(() => {
          NavigationAction.resetToBannedAccount()
          SplashScreen.hide()
        }, 100)
      } else if (meV2.data && !meV2.loading) {
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
    }
  }, [meV2, maintenance, me]);
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
 *
 * Please, before update this code, confirm to sakti first
 */
