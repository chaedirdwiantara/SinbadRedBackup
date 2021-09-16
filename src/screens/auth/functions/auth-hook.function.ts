/** === IMPORT PACKAGE HERE === */
import { useDispatch, useSelector } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTION === */
/** => call auth action */
const useAuthAction = () => {
  const dispatch = useDispatch();
  const { loginUsername } = useSelector((state: any) => state.auth);
  return {
    loginUserName: (data: models.LoginUserNameProps) => {
      dispatch(Actions.loginUserNameProcess(data));
    },
    resetLoginUsername: () => {
      dispatch(Actions.resetLoginUsername());
    },
    logout: () => {
      dispatch(Actions.logoutProcess());
    },
    state: loginUsername,
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
