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
/** => for auth data */
const useDataAuth = (): AuthProps => {
  return useSelector((state: RootState) => state.authCore);
};
const useDataGlobal = () => {
  return useSelector((state: RootState) => state.permanent.global);
};
const useDataVoucher = (): models.VoucherDataProps => {
  return useSelector((state: RootState) => state.voucher);
};
const useDataCartSelected = () => {
  return useSelector((state: RootState) => state.cartSelected);
};
const useDataCheckout = () => {
  return useSelector((state: RootState) => state.checkout);
};
const useDataPaymentChannels = () => {
  return useSelector((state: RootState) => state.paymentChannelsModal);
};
const useDataCartMaster = () => {
  return useSelector((state: RootState) => state.cartMaster);
};
const useDataTotalProductCart = () => {
  return useSelector((state: RootState) => state.cartTotalProduct);
};
/** === EXPORT === */
export {
  useDataPermanent,
  useDataGlobal,
  useDataVoucher,
  useDataFlagRTDB,
  useDataAuth,
  useDataCartSelected,
  useDataCheckout,
  useDataPaymentChannels,
  useDataCartMaster,
  useDataTotalProductCart,
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
