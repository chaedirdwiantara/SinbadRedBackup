import * as Actions from '@actions';
import * as models from '@models';
import { useRoute, useNavigation } from '@react-navigation/core';
import {
  LIST_LOCATION_VIEW,
  DATA_VERIFICATION_VIEW,
} from '@screen/account/functions/screens_name';
import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import RNOtpVerify from 'react-native-otp-verify';

import { useDispatch, useSelector } from 'react-redux';
import { useDataAuth } from '@core/redux/Data';

const useOTP = (action = '') => {
  const dispatch = useDispatch();
  const { reset } = useNavigation();
  const { params }: any = useRoute();
  const { verifyOTP } = useSelector((state: any) => state.auth);
  const [mobilePhone, setMobilePhone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [otpHash, setOtpHash] = React.useState('');
  const [type, setType] = React.useState('');
  const { meV2 } = useDataAuth();
  const [isMounted, setIsMounted] = React.useState(true)
  const { requestOTP } = useDataAuth()
  
  React.useEffect(() => {
    RNOtpVerify.getHash().then((value) => isMounted && setOtpHash(value[0]));
    if (action === 'listeningToHash') {
      startListeningForOtp();
    }
    return () => {
      RNOtpVerify.removeListener();
      setIsMounted(false)
    }
  }, []);

  React.useEffect(() => {
    if (action === 'listeningToHash' && requestOTP.data !== null) {
      startListeningForOtp();
    }
  }, [requestOTP.data]);

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
      if (meV2.data?.data?.isRegisteredOnNG === false) {
        reset({ index: 0, routes: [{ name: DATA_VERIFICATION_VIEW }] });
      } else if (meV2.data?.data?.isRegisteredOnNG === true) {
        reset({ index: 0, routes: [{ name: LIST_LOCATION_VIEW }] });
      }
    }
  };

  const handleRequestPermissionResult = () => {
    if (meV2.data?.data?.isRegisteredOnNG === false) {
      reset({ index: 0, routes: [{ name: DATA_VERIFICATION_VIEW }] });
    } else if (meV2.data?.data?.isRegisteredOnNG === true) {
      reset({ index: 0, routes: [{ name: LIST_LOCATION_VIEW }] });
    }
  };

  React.useEffect(() => {
    setMobilePhone(params?.mobilePhone);
    setOtpHash(params?.otpHash);
    setType(params?.type);
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
    otpHash,
    type,
  };
};

export default useOTP;
