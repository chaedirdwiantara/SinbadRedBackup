/** === IMPORT PACKAGE HERE ===  */
import React from 'react';
/** === IMPORT EXTERNAL FUNCTION === */
import { useGetTokenNotLogin } from '@core/functions/firebase/get-fcm.function';
import {
  useCheckForceUpdateVersion,
  useCheckMaintenance,
  setFlagByDeviceId,
} from '@core/functions/firebase/flag-rtdb.function';
import { useSetUpdateAvailable } from '../../intro/functions';

/** === COMPONENT === */
const FirstView: React.FC = () => {
  /** === HOOK === */
  /** ==> set deviceId to RTDB firebase */
  setFlagByDeviceId();
  /** ==> set if update available */
  useSetUpdateAvailable().setUpdateAvailable();
  /** ==> save fcm to firestore */
  useGetTokenNotLogin();
  /** ==> listen version of force update */
  useCheckForceUpdateVersion();
  /** => listen for maintenance */
  useCheckMaintenance();
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
