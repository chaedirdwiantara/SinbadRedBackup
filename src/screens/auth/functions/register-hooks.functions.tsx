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
  const state = useSelector((state: any) => state.auth);
  const registerState = state.register;
  const dispatch = useDispatch();
  const merchantData: models.IMerchantData | any = state.merchantData;

  const register = () => {
    for (const key in merchantData) {
      if (merchantData[key] === null || merchantData[key] === '') {
        delete merchantData[key];
      }
    }
    for (const key in merchantData.user) {
      if (merchantData.user[key] === null || merchantData.user[key] === '') {
        delete merchantData.user[key];
      }
    }
    dispatch(Actions.merchantRegisterProcess(merchantData));
  };

  const resetRegister = () => {
    dispatch(Actions.resetRegister());
  };
  return {
    register,
    registerState,
    resetRegister,
  };
};
