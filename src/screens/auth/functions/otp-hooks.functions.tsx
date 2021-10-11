import * as Actions from '@actions';
import * as models from '@models';
import { useRoute } from '@react-navigation/core';
import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

const useOTP = () => {
  const dispatch = useDispatch();
  const { params }: any = useRoute();
  const { verifyOTP } = useSelector((state: any) => state.auth);
  const [mobilePhone, setMobilePhone] = React.useState('');

  const verifyOTPRegister = (data: models.IVerifyOTPRegister) => {
    dispatch(Actions.verifyOTPRegisterProcess(data));
  };

  const resetVerifyOTP = () => {
    dispatch(Actions.resetVerifyOTP());
  };

  React.useEffect(() => {
    setMobilePhone(params?.phoneNo);
    return resetVerifyOTP;
  }, []);

  return {
    verifyOTPRegister,
    verifyOTP,
    resetVerifyOTP,
    mobilePhone,
  };
};

export default useOTP;
