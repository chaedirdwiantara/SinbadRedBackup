import * as Actions from '@actions';
import * as models from '@models';
import { useRoute } from '@react-navigation/core';
import React from 'react';
import RNOtpVerify from 'react-native-otp-verify';

import { useDispatch, useSelector } from 'react-redux';

const useOTP = () => {
  const dispatch = useDispatch();
  const { params }: any = useRoute();
  const { verifyOTP } = useSelector((state: any) => state.auth);
  const [mobilePhone, setMobilePhone] = React.useState('');
  const [otp, setOtp] = React.useState('');

  React.useEffect(() => {
    // RNOtpVerify.getHash().then(startListeningForOtp);
    startListeningForOtp();
    return RNOtpVerify.removeListener;
  }, []);

  const startListeningForOtp = () => {
    RNOtpVerify.getOtp().then(() => {
      RNOtpVerify.addListener((message: string) => {
        const result = /(\d{5})/g.exec(message);
        result && result?.length > 0 && setOtp(result[0]);
      });
    });
  };

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
    otp,
    setOtp,
  };
};

export default useOTP;
