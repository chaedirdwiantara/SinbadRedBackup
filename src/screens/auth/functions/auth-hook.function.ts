/** === IMPORT PACKAGE HERE === */
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '@actions';
import * as models from '@models';
import { contexts } from '@contexts';
import { meReset } from '@core/data/actions';
/** === FUNCTION === */
/** => call auth action */
const useAuthAction = () => {
  const dispatch = useDispatch();
  const { loginUsername, requestOTP, verifyOTP } = useSelector(
    (state: any) => state.auth,
  );
  const { dispatchCart } = useContext(contexts.CartContext);
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
      dispatch(Actions.getTotalCartReset(dispatchCart));
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
