/** === IMPORT PACKAGE HERE === */
import { useSelector } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { RootState } from '@reducers';
/** === IMPORT MODEL === */
import * as models from '@models';
/** === IMPORT TYPE === */
import type { AuthProps } from '../data/reducers/auth';
/** === FUNCTION === */
/** => for data permanent */
const useDataPermanent = (): models.Permanent => {
  return useSelector((state: RootState) => state.permanentCore);
};
/** => flag RTDB */
const useDataFlagRTDB = (): models.FlagRTDB => {
  return useSelector((state: RootState) => state.globalCore.flagRTDB);
};
/** => global data */
const useDataUpdateApp = (): models.updateApp => {
  return useSelector((state: RootState) => state.globalCore.updateApp);
};
/** => global data */
const useDataNotificationQuit = (): models.notificationQuit => {
  return useSelector((state: RootState) => state.globalCore.notificationQuit);
};
/** => for auth data */
const useDataAuth = (): AuthProps => {
  return useSelector((state: RootState) => state.authCore);
};
const useDataGlobal = () => {
  return useSelector((state: RootState) => state.permanent.global);
};
const useDataVoucher = (): models.VoucherLocalData => {
  return useSelector((state: RootState) => state.voucher);
};
const useDataTotalNotification = () => {
  return useSelector((state: RootState) => state.notificaitonTotalReducer);
};
/** === EXPORT === */
export {
  useDataPermanent,
  useDataGlobal,
  useDataVoucher,
  useDataFlagRTDB,
  useDataAuth,
  useDataTotalNotification,
  useDataUpdateApp,
  useDataNotificationQuit,
};
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
