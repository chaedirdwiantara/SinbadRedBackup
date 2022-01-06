/** === IMPORT PACKAGE HERE === */
import { useDispatch, useSelector } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { meReset } from '@core/data/actions';
/** === FUNCTION === */
/** => call auth action */
const useAuthAction = () => {
  const dispatch = useDispatch();
  const { loginUsername, requestOTP, verifyOTP } = useSelector(
    (state: any) => state.auth,
  );
  return {
    loginUserName: (data: models.LoginUserName) => {
      dispatch(Actions.loginUserNameProcess(data));
    },
    resetLoginUsername: () => {
      dispatch(Actions.resetLoginUsername());
    },
    requestOTP: (data: models.OtpRequest) => {
      dispatch(Actions.requestOTPProcess(data));
    },
    verificationOTP: (data: models.LoginPhoneNumber) => {
      dispatch(Actions.verificationOTPProcess(data));
    },
    logout: () => {
      dispatch(Actions.logoutProcess());
      dispatch(meReset());
      dispatch(Actions.cartTotalProductReset());
      dispatch(Actions.resetCheckoutMasterData());
      dispatch(Actions.resetCartMasterData());
      dispatch(Actions.notificationTotalReset());
    },
    resetRequestOTP: () => {
      dispatch(Actions.resetRequestOTP());
    },
    loginIDState: loginUsername,
    requestOTPState: requestOTP,
    verifyOTP,
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
