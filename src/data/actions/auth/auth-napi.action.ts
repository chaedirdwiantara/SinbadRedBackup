import * as types from '@types';

export const resetLoginUsername = () => {
  return { type: types.LOGIN_USERNAME_RESET };
};

export const resetVerifyOTP = () => {
  return {
    type: types.VERIFY_OTP_RESET,
  };
};
