/** === IMPORT PACKAGE HERE === */
import { useSelector, useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { RootState } from '@reducers';
/** === FUNCTION === */
const useDataGlobal = () => {
  return useSelector((state: RootState) => state.permanent.global);
};
const useDataVoucher = () => {
  return useSelector((state: RootState) => state.voucher);
};
/** === EXPORT === */
export { useDataGlobal, useDataVoucher };
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
