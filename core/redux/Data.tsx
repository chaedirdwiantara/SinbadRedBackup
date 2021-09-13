/** === IMPORT PACKAGE HERE === */
import { useSelector, useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { RootState } from '@reducers';
/** === FUNCTION === */
const useDataGlobal = () => {
  return useSelector((state: RootState) => state.permanent.global);
};
/** === EXPORT === */
export { useDataGlobal };
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
