import * as Actions from '@actions';
import * as models from '@models';

import { useDispatch, useSelector } from 'react-redux';

const useOTP = () => {
  const dispatch = useDispatch();
  const { verifyOTP } = useSelector((state: any) => state.auth);

  const verifyOTPRegister = (data: models.IVerifyOTPRegister) => {
    dispatch(Actions.verifyOTPRegisterProcess(data));
  };

  const resetVerifyOTP = () => {
    dispatch(Actions.resetVerifyOTP());
  };

  return {
    verifyOTPRegister,
    verifyOTP,
    resetVerifyOTP,
  };
};

export default useOTP;
