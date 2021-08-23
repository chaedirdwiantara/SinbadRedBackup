/** === IMPORT PACKAGE HERE === */
import { useSelector } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import { RootState } from '@reducers';
import * as models from '@models';
/** === FUNCTION === */
/** => collect data */
/** brand */
const useUserData = () => {
  const data: models.UserProps = useSelector(
    (state: RootState) => state.permanent.user,
  );
  return data;
};
/** === EXPORT === */
export { useUserData };
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
