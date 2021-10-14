import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
// import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const loginUsername = simplifyReducer(INITIAL_STATE, {
  [types.LOGIN_USERNAME_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.LOGIN_USERNAME_SUCCESS](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      loading: false,
      data: action.payload.data,
    };
  },

  [types.LOGIN_USERNAME_FAILED](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.LOGIN_USERNAME_RESET]() {
    return INITIAL_STATE;
  },
});
