/** === IMPORT PACKAGE HERE === */
import { useDispatch } from 'react-redux';
/** === IMPORT EXTERNAL FUNCTION HERE === */
import * as Actions from '../../data/actions';
import * as models from '@models';
/** === FUNCTION === */
/** => call auth action */
const useAuthCoreAction = () => {
  const dispatch = useDispatch();
  return {
    me: () => {
      dispatch(Actions.meReset());
      dispatch(Actions.meProcess());
    },
    loginUserName: (data: models.LoginUserName) => {
      dispatch(Actions.loginUserNameProcess(data));
    },
    resetLoginUsername: () => {
      dispatch(Actions.loginUserNameReset());
    },
    requestOTP: (data: models.OtpRequest) => {
      dispatch(Actions.requestOTPReset());
      dispatch(Actions.requestOTPProcess(data));
    },
    resetRequestOTP: () => {
      dispatch(Actions.requestOTPReset());
    },
    verificationOTP: (data: models.LoginPhoneNumber) => {
      dispatch(Actions.verificationOTPProcess(data));
    },
    resetVerificationOTP: () => {
      dispatch(Actions.verificationOTPReset());
    },
    logout: () => {
      dispatch(Actions.logoutProcess());
    },
    resetLogout: () => {
      dispatch(Actions.logoutReset());
    },
    meV2: () => {
      dispatch(Actions.meV2Reset());
      dispatch(Actions.meV2Process());
    },
    checkPhoneLogin: (data: models.ICheckPhoneLogin) => {
      dispatch(Actions.checkPhoneLogin(data))
    },
    resetCheckLoginPhone: () => {
      dispatch(Actions.checkPhoneLoginReset())
    }
  };
};
/** === EXPORT === */
export { useAuthCoreAction };
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
