import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const checkPhoneRegisterV3 = simplifyReducer(INITIAL_STATE, {
  [types.CHECK_PHONE_REGISTRATION_V3_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.CHECK_PHONE_REGISTRATION_V3_SUCCESS](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.ICheckPhoneV3Success>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload.data,
    };
  },

  [types.CHECK_PHONE_REGISTRATION_V3_FAILED](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.ICheckPhoneNoAvailabilityFailed>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.CHECK_PHONE_REGISTRATION_V3_RESET]() {
    return INITIAL_STATE;
  },
});
