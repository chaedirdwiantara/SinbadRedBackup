import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const verifyOTP = simplifyReducer(INITIAL_STATE, {
  [types.VERIFY_OTP_REGISTER_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.VERIFICATION_OTP_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.VERIFY_OTP_REGISTER_SUCCESS](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.IVerifyOTPSuccess>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  },

  [types.VERIFICATION_OTP_SUCCESS](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.IVerifyOTPSuccess>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  },

  [types.VERIFY_OTP_REGISTER_FAILED](
    state = INITIAL_STATE,
    action: models.IRegisterAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.VERIFICATION_OTP_FAILED](
    state = INITIAL_STATE,
    action: models.IRegisterAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.VERIFY_OTP_RESET]() {
    return INITIAL_STATE;
  },
});
