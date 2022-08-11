/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
/** === IMPORT EXTERNAL FUNCTION === */
import { useGetTokenNotLogin } from '@core/functions/firebase/get-fcm.function';
import {
  useCheckForceUpdateVersion,
  useCheckMaintenance,
} from '@core/functions/firebase/flag-rtdb.function';
/** === COMPONENT === */
const FirstView: React.FC = () => {
  /** === HOOK === */
  /** ==> save fcm to firestore */
  useGetTokenNotLogin();
  /** ==> listen version of force update */
  useCheckForceUpdateVersion();
  /** => listen for maintenance */
  useCheckMaintenance();
  /** === EFFECT === */
  React.useEffect(() => {
    SplashScreen.hide();
    console.log('ini pertama yang di load');
  }, []);
  /** === VIEW === */
  /** => main */
  return null;
};

export default FirstView;
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
