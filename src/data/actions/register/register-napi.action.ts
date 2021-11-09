import * as models from '@models';
import * as types from '@types';

// SAVE REGISTER DATA
export const saveStoreData = (
  data: models.IMerchantData,
): models.IRegisterAction<models.IMerchantData> => {
  return {
    type: types.SAVE_STORE_DATA,
    payload: data,
  };
};

// SAVE REGISTER DATA
export const saveUserData = (
  data: models.User,
): models.IRegisterAction<models.User> => {
  return {
    type: types.SAVE_USER_DATA,
    payload: data,
  };
};

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
