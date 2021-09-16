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

export const resetCheckPhoneNoAvailability = () => {
  return {
    type: types.CHECK_PHONE_AVAILABILITY_RESET,
  };
};

// REGISTER MERCHANT ACTION
export const merchantRegisterProcess = (
  data: models.IRegisterMerchantProcess,
): models.IRegisterAction<models.IRegisterMerchantProcess> => {
  return {
    type: types.REGISTER_MERCHANT_PROCESS,
    payload: data,
  };
};

export const merchantRegisterSuccess = (
  data: models.IRegisterMerchantSuccess,
): models.IRegisterAction<models.IRegisterMerchantSuccess> => {
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
