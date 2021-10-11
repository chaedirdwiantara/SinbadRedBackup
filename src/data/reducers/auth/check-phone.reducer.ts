import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const checkPhoneNoAvailability = simplifyReducer(INITIAL_STATE, {
  [types.CHECK_PHONE_AVAILABILITY_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.CHECK_PHONE_AVAILABILITY_SUCCESS](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.ICheckPhoneNoAvailabilitySuccess>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload.data,
    };
  },

  [types.CHECK_PHONE_AVAILABILITY_FAILED](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.ICheckPhoneNoAvailabilityFailed>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.CHECK_PHONE_AVAILABILITY_RESET]() {
    return INITIAL_STATE;
  },
});
