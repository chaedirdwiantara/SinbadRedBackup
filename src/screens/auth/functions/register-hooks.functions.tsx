import * as Actions from '@actions';
import * as models from '@models';
import { useDispatch, useSelector } from 'react-redux';

export const useCheckPhoneNoAvailability = () => {
  const dispatch = useDispatch();
  const { checkPhoneNoAvailability } = useSelector((state: any) => state.auth);
  return {
    checkPhone: (data: models.ICheckPhoneNoAvailabilityProcess) => {
      dispatch(Actions.checkPhoneNoAvailabilityProcess(data));
    },
    resetCheckPhone: () => {
      dispatch(Actions.resetCheckPhoneNoAvailability());
    },
    checkPhoneNoAvailability,
  };
};

export const useCheckEmailAvailability = () => {
  const dispatch = useDispatch();
  const { checkEmailAvailability } = useSelector((state: any) => state.auth);
  return {
    checkEmail: (data: models.ICheckEmailAvailabilityProcess) => {
      dispatch(Actions.checkEmailAvailabilityProcess(data));
    },
    resetCheckEmail: () => {
      dispatch(Actions.resetCheckEmailAvailability());
    },
    checkEmailAvailability,
  };
};

export const useRegister = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.auth);
  const registerData: models.IRegisterMerchantProcess = state.registerData;
  const registerState = state.register;
  const saveRegisterStoreData = (data: models.IRegisterMerchantProcess) => {
    dispatch(Actions.saveRegisterStoreData(data));
  };

  const saveRegisterUserData = (data: models.User) => {
    dispatch(Actions.saveRegisterUserData(data));
  };

  const resetRegisterData = () => {
    dispatch(Actions.resetRegisterData());
  };

  const register = () => {
    if (registerData.user?.email === '') {
      delete registerData.user?.email;
    }
    if (registerData.user?.taxNo === '') {
      delete registerData.user?.taxNo;
    }
    dispatch(Actions.merchantRegisterProcess(registerData));
  };

  const resetRegister = () => {
    dispatch(Actions.resetRegister());
  };

  return {
    saveRegisterStoreData,
    saveRegisterUserData,
    resetRegisterData,
    registerData,
    register,
    registerState,
    resetRegister,
  };
};
