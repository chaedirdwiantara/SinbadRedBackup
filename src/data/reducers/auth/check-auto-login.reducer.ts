import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const checkAutoLoginData = simplifyReducer(INITIAL_STATE, {
  [types.CHECK_AUTO_LOGIN_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.CHECK_AUTO_LOGIN_SUCCESS](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.ICheckAutoLoginSuccess>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  },

  [types.CHECK_AUTO_LOGIN_FAILED](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.ICheckAutoLoginFailed>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.CHECK_AUTO_LOGIN_RESET]() {
    return INITIAL_STATE;
  },
});
