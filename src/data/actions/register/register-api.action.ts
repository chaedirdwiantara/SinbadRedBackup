import * as models from '@models';
import * as types from '@types';

// CHECK PHONE NO AVAILABILITY
export const checkPhoneNoAvailabilityProcess = (
  data: models.ICheckPhoneNoAvailabilityProcess,
): models.IRegisterAction<models.ICheckPhoneNoAvailabilityProcess> => {
  return {
    type: types.CHECK_PHONE_AVAILABILITY_PROCESS,
    payload: data,
  };
};

export const checkPhoneNoAvailabilitySuccess = (
  data: models.ICheckPhoneNoAvailabilitySuccess,
): models.IRegisterAction<models.ICheckPhoneNoAvailabilitySuccess> => {
  return {
    type: types.CHECK_PHONE_AVAILABILITY_SUCCESS,
    payload: data,
  };
};

export const checkPhoneNoAvailabilityFailed = (
  data: models.ErrorProps | unknown,
): models.IRegisterAction<models.ICheckPhoneNoAvailabilityFailed | unknown> => {
  return {
    type: types.CHECK_PHONE_AVAILABILITY_FAILED,
    payload: data,
  };
};

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

// REGISTER MERCHANT ACTION
export const merchantRegisterProcess = (
  data: models.IMerchantData,
): models.IRegisterAction<models.IMerchantData> => {
  return {
    type: types.REGISTER_MERCHANT_PROCESS,
    payload: data,
  };
};

export const merchantRegisterSuccess = (
  data: models.IRegisterMerchantDetail,
): models.IRegisterAction<models.IRegisterMerchantDetail> => {
  return {
    type: types.REGISTER_MERCHANT_SUCCESS,
    payload: data,
  };
};

export const merchantRegisterFailed = (
  data: models.ErrorProps | unknown,
): models.IRegisterAction<models.IRegisterMerchantFailed | unknown> => {
  return {
    type: types.REGISTER_MERCHANT_FAILED,
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

// CHECK PHONE NO AVAILABILITY V3
export const checkPhoneRegistrationV3Process = (
  data: models.ICheckPhoneV3Process,
): models.IRegisterAction<models.ICheckPhoneV3Process> => {
  return {
    type: types.CHECK_PHONE_REGISTRATION_V3_PROCESS,
    payload: data,
  };
};

export const checkPhoneRegistrationV3Success = (
  data: models.ICheckPhoneV3Success,
): models.IRegisterAction<models.ICheckPhoneV3Success> => {
  return {
    type: types.CHECK_PHONE_REGISTRATION_V3_SUCCESS,
    payload: data,
  };
};

export const checkPhoneRegistrationV3Failed = (
  data: models.ErrorProps | unknown,
): models.IRegisterAction<models.ICheckPhoneNoAvailabilityFailed | unknown> => {
  return {
    type: types.CHECK_PHONE_REGISTRATION_V3_FAILED,
    payload: data,
  };
};

export const checkPhoneRegistrationV3Reset = () => {
  return { type: types.CHECK_PHONE_REGISTRATION_V3_RESET };
};

// GET USER MEDEA
export const getUserMedeaProcess = (
  data: models.IUserMedeaProcess,
): models.IRegisterAction<models.IUserMedeaProcess> => {
  return {
    type: types.GET_USER_MEDEA_PROCESS,
    payload: data,
  };
};

export const getUserMedeaSuccess = (
  data: models.IUserMedea,
): models.IRegisterAction<models.IUserMedea> => {
  return {
    type: types.GET_USER_MEDEA_SUCCESS,
    payload: data,
  };
};

export const getUserMedeaFailed = (
  data: models.ErrorProps | unknown,
): models.IRegisterAction<models.IUserMedeaFailed | unknown> => {
  return {
    type: types.GET_USER_MEDEA_FAILED,
    payload: data,
  };
};

export const getUserMedeaReset = () => {
  return { type: types.GET_USER_MEDEA_RESET };
};

// UPDATE USER MEDEA
export const updateUserMedeaProcess = (
  data: models.IUpdateUserMedeaProcess,
): models.IRegisterAction<models.IUpdateUserMedeaProcess> => {
  return {
    type: types.UPDATE_USER_MEDEA_PROCESS,
    payload: data,
  };
};

export const updateUserMedeaSuccess = (
  data: models.IUpdateUserMedeaSuccess,
): models.IRegisterAction<models.IUpdateUserMedeaSuccess> => {
  return {
    type: types.UPDATE_USER_MEDEA_SUCCESS,
    payload: data,
  };
};

export const updateUserMedeaFailed = (
  data: models.ErrorProps | unknown,
): models.IRegisterAction<models.IUserMedeaFailed | unknown> => {
  return {
    type: types.UPDATE_USER_MEDEA_FAILED,
    payload: data,
  };
};

export const updateUserMedeaReset = () => {
  return { type: types.UPDATE_USER_MEDEA_RESET };
};
