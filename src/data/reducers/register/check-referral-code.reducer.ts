import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const checkReferralCodeData = simplifyReducer(INITIAL_STATE, {
  [types.CHECK_REFERRAL_CODE_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.CHECK_REFERRAL_CODE_SUCCESS](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.ICheckReferralSuccess>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload.data,
    };
  },

  [types.CHECK_REFERRAL_CODE_FAILED](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.IUserMedeaFailed>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.CHECK_REFERRAL_CODE_RESET]() {
    return INITIAL_STATE;
  },
});
