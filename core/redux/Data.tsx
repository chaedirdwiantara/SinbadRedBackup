/** === IMPORT PACKAGE HERE === */
import { useSelector, useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { RootState } from '@reducers';
/** === IMPORT MODEL === */
import * as flagModel from '../data/models/flag-rtdb/flag-rtdb.model';
/** === FUNCTION === */
const useDataGlobal = () => {
  return useSelector((state: RootState) => state.permanent.global);
};
const useDataVoucher = () => {
  return useSelector((state: RootState) => state.voucher);
};
/** => flag RTDB */
const useDataFlagRTDB = (): flagModel.FlagRTDB => {
  return useSelector((state: RootState) => state.flagRTDB);
};
/** === EXPORT === */
export { useDataGlobal, useDataVoucher, useDataFlagRTDB };
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
