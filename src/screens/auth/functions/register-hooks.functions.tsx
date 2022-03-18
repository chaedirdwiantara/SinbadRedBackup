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

export const useRegister = () => {
  const state = useSelector((state: any) => state.auth);
  const registerState = state.register;
  const dispatch = useDispatch();
  const merchantData: models.IMerchantData | any = state.merchantData;
  const registerParams = { ...merchantData };

  const register = () => {
    for (const key in registerParams) {
      if (registerParams[key] === null || registerParams[key] === '') {
        delete registerParams[key];
      }
    }
    for (const key in registerParams.user) {
      if (
        registerParams.user[key] === null ||
        registerParams.user[key] === ''
      ) {
        delete registerParams.user[key];
      }
    }
    dispatch(Actions.merchantRegisterProcess(registerParams));
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
