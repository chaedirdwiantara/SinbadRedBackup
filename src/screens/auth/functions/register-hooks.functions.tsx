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
    state: checkPhoneNoAvailability,
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
    state: checkEmailAvailability,
  };
};

export const useRegister = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.auth);
  const registerData: models.IRegisterMerchantProcess = state.registerData;
  const saveRegisterStoreData = (data: models.IRegisterMerchantProcess) => {
    dispatch(Actions.saveRegisterStoreData(data));
  };

  const saveRegisterUserData = (data: models.User) => {
    dispatch(Actions.saveRegisterUserData(data));
  };

  const resetRegisterData = () => {
    dispatch(Actions.resetRegisterData());
  };

  return {
    saveRegisterStoreData,
    saveRegisterUserData,
    resetRegisterData,
    state: registerData,
  };
};
