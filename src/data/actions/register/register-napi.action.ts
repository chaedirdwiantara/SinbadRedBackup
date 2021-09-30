import * as models from '@models';
import * as types from '@types';

// SAVE REGISTER DATA
export const saveRegisterStoreData = (
  data: models.IRegisterMerchantProcess,
): models.IRegisterAction<models.IRegisterMerchantProcess> => {
  return {
    type: types.SAVE_REGISTER_STORE_DATA,
    payload: data,
  };
};

// SAVE REGISTER DATA
export const saveRegisterUserData = (
  data: models.User,
): models.IRegisterAction<models.User> => {
  return {
    type: types.SAVE_REGISTER_USER_DATA,
    payload: data,
  };
};

export const resetRegisterData = () => {
  return {
    type: types.RESET_REGISTER_DATA,
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
