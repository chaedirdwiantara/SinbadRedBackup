import React from 'react';
import * as Actions from '@actions';
import * as models from '@models';
import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from '@core/functions/hook/debounce';

export const useCheckPhoneV2 = () => {
  const dispatch = useDispatch();
  const { checkPhoneV2 } = useSelector((state: any) => state.auth);
  return {
    checkPhone: (data: models.ICheckPhoneV2Process) => {
      dispatch(Actions.checkPhoneV2Process(data));
    },
    resetCheckPhone: () => {
      dispatch(Actions.resetCheckPhoneNoAvailability());
    },
    checkPhoneV2Reset: () => {
      dispatch(Actions.checkPhoneV2Reset());
    },
    checkPhoneV2,
  };
};

export const useCheckAutoLogin = () => {
  const dispatch = useDispatch();
  const { checkAutoLoginData } = useSelector((state: any) => state.auth);
  return {
    checkAutoLogin: (data: models.ICheckAutoLoginProcess) => {
      dispatch(Actions.checkAutoLoginProcess(data));
    },
    resetCheckAutoLogin: () => {
      dispatch(Actions.checkAutoLoginReset());
    },
    checkAutoLoginData,
  };
};
export const useCheckPhoneRegistrationV3 = () => {
  const dispatch = useDispatch();
  const { checkPhoneRegisterV3 } = useSelector((state: any) => state.auth);
  return {
    checkPhoneRegistration: (data: models.ICheckPhoneV3Process) => {
      dispatch(Actions.checkPhoneRegistrationV3Process(data));
    },
    checkPhoneRegistrationReset: () => {
      dispatch(Actions.checkPhoneRegistrationV3Reset());
    },
    checkPhoneRegisterV3,
  };
};
export const useCheckReferralCode = () => {
  const dispatch = useDispatch();
  const { checkReferralCodeData } = useSelector((state: any) => state.register);
  return {
    checkReferralCode: (data: models.ICheckReferralProcess) => {
      dispatch(Actions.checkReferralCodeProcess(data));
    },
    resetReferralCode: () => {
      dispatch(Actions.checkReferralCodeReset());
    },
    checkReferralCodeData,
  };
};

export const useReferral = () => {
  const [referralValue, setReferralValue] = React.useState('');
  const debouncedValue = useDebounce<string>(referralValue!);

  return {
    searchReferral: (value: string) => {
      setReferralValue(value);
    },
    referralValue,
    debouncedValue,
  };
};
