import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const checkEmailAvailability = simplifyReducer(INITIAL_STATE, {
  [types.CHECK_EMAIL_AVAILABILITY_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.CHECK_EMAIL_AVAILABILITY_SUCCESS](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.ICheckEmailAvailabilitySuccess>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  },

  [types.CHECK_EMAIL_AVAILABILITY_FAILED](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.ICheckEmailAvailabilityFailed>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.CHECK_EMAIL_AVAILABILITY_RESET]() {
    return INITIAL_STATE;
  },
});
