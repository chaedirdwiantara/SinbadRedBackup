import * as types from '@types';

export const resetMerchantData = () => {
  return {
    type: types.RESET_MERCHANT_DATA,
  };
};

export const resetRegister = () => {
  return {
    type: types.REGISTER_MERCHANT_RESET,
  };
};

export const resetCheckPhoneNoAvailability = () => {
  return {
    type: types.CHECK_PHONE_AVAILABILITY_RESET,
  };
};

export const resetCheckEmailAvailability = () => {
  return {
    type: types.CHECK_EMAIL_AVAILABILITY_RESET,
  };
};
