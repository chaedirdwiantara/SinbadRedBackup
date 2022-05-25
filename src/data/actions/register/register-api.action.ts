import * as models from '@models';
import * as types from '@types';

// CHECK EMAIL AVAILABILITY
export const checkEmailAvailabilityProcess = (
  data: models.ICheckEmailAvailabilityProcess,
): models.IRegisterAction<models.ICheckEmailAvailabilityProcess> => {
  return {
    type: types.CHECK_EMAIL_AVAILABILITY_PROCESS,
    payload: data,
  };
};

export const checkEmailAvailabilitySuccess = (
  data: models.ICheckEmailAvailabilitySuccess,
): models.IRegisterAction<any> => {
  return {
    type: types.CHECK_EMAIL_AVAILABILITY_SUCCESS,
    payload: data,
  };
};

export const checkEmailAvailabilityFailed = (
  data: models.ErrorProps | unknown,
): models.IRegisterAction<models.ICheckEmailAvailabilityFailed | unknown> => {
  return {
    type: types.CHECK_EMAIL_AVAILABILITY_FAILED,
    payload: data,
  };
};

export const verifyOTPRegisterProcess = (
  data: models.IVerifyOTPRegister,
): models.IRegisterAction<models.IVerifyOTPRegister> => {
  return {
    type: types.VERIFY_OTP_REGISTER_PROCESS,
    payload: data,
  };
};

export const verifyOTPRegisterSuccess = (
  data: models.IVerifyOTPSuccess,
): models.IRegisterAction<models.IVerifyOTPSuccess> => {
  return {
    type: types.VERIFY_OTP_REGISTER_SUCCESS,
    payload: data,
  };
};

export const verifyOTPRegisterFailed = (
  data: models.ErrorProps | unknown,
): models.IRegisterAction<any> => {
  return {
    type: types.VERIFY_OTP_REGISTER_FAILED,
    payload: data,
  };
};

// CHECK PHONE NO AVAILABILITY V2
export const checkPhoneV2Process = (
  data: models.ICheckPhoneV2Process,
): models.IRegisterAction<models.ICheckPhoneV2Process> => {
  return {
    type: types.CHECK_PHONE_V2_PROCESS,
    payload: data,
  };
};

export const checkPhoneV2Success = (
  data: models.ICheckPhoneV2Success,
): models.IRegisterAction<models.ICheckPhoneV2Success> => {
  return {
    type: types.CHECK_PHONE_V2_SUCCESS,
    payload: data,
  };
};

export const checkPhoneV2Failed = (
  data: models.ErrorProps | unknown,
): models.IRegisterAction<models.ICheckPhoneNoAvailabilityFailed | unknown> => {
  return {
    type: types.CHECK_PHONE_V2_FAILED,
    payload: data,
  };
};

export const checkPhoneV2Reset = () => {
  return { type: types.CHECK_PHONE_V2_RESET };
};

// CHECK AUTO LOGIN AFTER REGISTER
export const checkAutoLoginProcess = (
  data: models.ICheckAutoLoginProcess,
): models.IRegisterAction<models.ICheckAutoLoginProcess> => {
  return {
    type: types.CHECK_AUTO_LOGIN_PROCESS,
    payload: data,
  };
};

export const checkAutoLoginSuccess = (
  data: models.ICheckAutoLoginSuccess,
): models.IRegisterAction<models.ICheckAutoLoginSuccess> => {
  return {
    type: types.CHECK_AUTO_LOGIN_SUCCESS,
    payload: data,
  };
};

export const checkAutoLoginFailed = (
  data: models.ErrorProps | unknown,
): models.IRegisterAction<models.ICheckAutoLoginFailed | unknown> => {
  return {
    type: types.CHECK_AUTO_LOGIN_FAILED,
    payload: data,
  };
};

export const checkAutoLoginReset = () => {
  return { type: types.CHECK_AUTO_LOGIN_RESET };
};
