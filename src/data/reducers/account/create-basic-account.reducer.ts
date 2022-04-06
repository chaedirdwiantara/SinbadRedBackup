import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const createBasicAccount = simplifyReducer(INITIAL_STATE, {
  [types.CREATE_BASIC_ACCOUNT_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.CREATE_BASIC_ACCOUNT_SUCCESS](
    state = INITIAL_STATE,
    action: models.IAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  },

  [types.CREATE_BASIC_ACCOUNT_FAILED](
    state = INITIAL_STATE,
    action: models.IAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.CREATE_BASIC_ACCOUNT_RESET]() {
    return INITIAL_STATE;
  },
});
