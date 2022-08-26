/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
/** === IMPORT EXTERNAL FUNCTION === */
import { useDataAuth, useDataPermanent } from '@core/redux/Data';
import { useAuthCoreAction, useAdsID } from '@core/functions/auth';
import { useCheckBannedAccount } from '@core/functions/firebase/flag-rtdb.function';
import { NavigationAction } from '@navigation';
import { useOTP } from '@screen/auth/functions';
import { useIsFocused } from '@react-navigation/native';
/** === COMPONENT === */
const IntroSplashView: React.FC = () => {
  const isFocused = useIsFocused();
  const { meV2, me } = useDataAuth();
  const { maintenance, userBanned } = useDataPermanent();
  const { getLocationPermissions } = useOTP();
  /** === HOOK === */
  /** => this for check account is banned/not */
  useCheckBannedAccount();
  const authCoreAction = useAuthCoreAction();
  // this for google ads ID
  const useAdsIDAction = useAdsID();
  /** === EFFECT === */
  /** => get auth me */
  React.useEffect(() => {
    if (!maintenance) {
      useAdsIDAction.saveAdsID();
      authCoreAction.me();
      authCoreAction.meV2();
    }
  }, []);

  React.useEffect(() => {
    if ((me.data?.user.id === userBanned?.userId) && userBanned?.isBanned) {
      setTimeout(() => {
        NavigationAction.resetToBannedAccount()
        SplashScreen.hide()
      }, 100)
    } else if (meV2.data && !meV2.loading) {
      if (meV2.data?.data?.isBuyerCategoryCompleted) {
        setTimeout(() => {
          if (isFocused) {
            NavigationAction.resetToHome();
          }
          SplashScreen.hide();
        }, 100);
      } else {
        getLocationPermissions();
        SplashScreen.hide();
      }
    } else if ((!meV2.data || meV2.error) && !meV2.loading) {
      setTimeout(() => {
        if (isFocused) {
          NavigationAction.resetToIntroSinbad();
        }
        SplashScreen.hide();
      }, 100);
    }
  }, [meV2, me]);
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