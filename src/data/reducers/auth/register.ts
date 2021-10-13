import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const register = simplifyReducer(INITIAL_STATE, {
  [types.REGISTER_MERCHANT_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.REGISTER_MERCHANT_SUCCESS](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.IRegisterMerchantDetail>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  },

  [types.REGISTER_MERCHANT_FAILED](
    state = INITIAL_STATE,
    action: models.IRegisterAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.REGISTER_MERCHANT_RESET]() {
    return INITIAL_STATE;
  },
});
