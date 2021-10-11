import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const requestOTP = simplifyReducer(INITIAL_STATE, {
  [types.REQUEST_OTP_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.REQUEST_OTP_SUCCESS](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.IVerifyOTPSuccess>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  },

  [types.REQUEST_OTP_FAILED](
    state = INITIAL_STATE,
    action: models.IRegisterAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.REQUEST_OTP_RESET]() {
    return INITIAL_STATE;
  },
});
