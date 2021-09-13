/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTION === */
/** => call auth action */
const useAuthAction = () => {
  const dispatch = useDispatch();
  return {
    loginUserName: (data: models.LoginUserNameProps) => {
      dispatch(Actions.loginUserNameProcess(data));
    },
    logout: () => {
      dispatch(Actions.logoutProcess());
    },
  };
};
/** === EXPORT === */
export { useAuthAction };
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
