import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const checkPhoneV2 = simplifyReducer(INITIAL_STATE, {
  [types.CHECK_PHONE_V2_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.CHECK_PHONE_V2_SUCCESS](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.ICheckPhoneV2Success>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload.data,
    };
  },

  [types.CHECK_PHONE_V2_FAILED](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.ICheckPhoneNoAvailabilityFailed>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.CHECK_PHONE_V2_RESET]() {
    return INITIAL_STATE;
  },
});
