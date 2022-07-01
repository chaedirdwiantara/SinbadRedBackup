import * as Actions from '@actions';
import * as models from '@models';
import { useRoute, useNavigation } from '@react-navigation/core';
import { LIST_LOCATION_VIEW } from '@screen/account/functions/screens_name';
import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';

import { useDispatch, useSelector } from 'react-redux';

const useOTP = (action = '') => {
  const dispatch = useDispatch();
  const { reset } = useNavigation();
  const { params }: any = useRoute();
  const { verifyOTP } = useSelector((state: any) => state.auth);
  const [mobilePhone, setMobilePhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [hashOtp, setHashOtp] = React.useState('');

  React.useEffect(() => {
    RNOtpVerify.getHash().then((value) => setHashOtp(value[0]));
    if (action === 'listeningToHash') {
      startListeningForOtp();
    }
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

  const getLocationPermissions = () => {
    switch (Platform.OS) {
      case 'android': {
        getAndroidLocationPermissions();
        break;
      }
      case 'ios': {
        break;
      }
    }
  };

  const getAndroidLocationPermissions = () => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then(handleCheckPermissionResult);
  };

  const handleCheckPermissionResult = (result: boolean) => {
    if (!result) {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ).then(handleRequestPermissionResult);
    } else {
      reset({ index: 0, routes: [{ name: LIST_LOCATION_VIEW }] });
    }
  };

  const handleRequestPermissionResult = () => {
    reset({ index: 0, routes: [{ name: LIST_LOCATION_VIEW }] });
  };

  React.useEffect(() => {
    setMobilePhone(params?.phoneNo);
    setHashOtp(params?.hashOtp);
    return resetVerifyOTP;
  }, []);

  return {
    verifyOTPRegister,
    verifyOTP,
    resetVerifyOTP,
    mobilePhone,
    otp,
    setOtp,
    getLocationPermissions,
    hashOtp,
  };
};

export default useOTP;
