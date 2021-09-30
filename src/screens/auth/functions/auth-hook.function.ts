/** === IMPORT PACKAGE HERE === */
import { useDispatch, useSelector } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
/** === FUNCTION === */
/** => call auth action */
const useAuthAction = () => {
  const dispatch = useDispatch();
  const { loginUsername, requestOTP, verifyOTP } = useSelector(
    (state: any) => state.auth,
  );
  return {
    loginUserName: (data: models.LoginUserNameProps) => {
      dispatch(Actions.loginUserNameProcess(data));
    },
    resetLoginUsername: () => {
      dispatch(Actions.resetLoginUsername());
    },
    requestOTP: (data: models.OtpRequestProps) => {
      dispatch(Actions.requestOTPProcess(data));
    },
    verificationOTP: (data: models.LoginPhoneNumberProps) => {
      dispatch(Actions.verificationOTPProcess(data));
    },
    logout: () => {
      dispatch(Actions.logoutProcess());
    },
    resetRequestOTP: () => {
      dispatch(Actions.resetRequestOTP());
    },
    loginIDState: loginUsername,
    requestOTPState: requestOTP,
    verifyOTPState: verifyOTP,
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
