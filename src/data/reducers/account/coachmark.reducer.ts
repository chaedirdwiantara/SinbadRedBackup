import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const coachmark = simplifyReducer(INITIAL_STATE, {
  [types.GET_COACHMARK_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.GET_COACHMARK_SUCCESS](
    state = INITIAL_STATE,
    action: models.IAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  },

  [types.GET_COACHMARK_FAILED](
    state = INITIAL_STATE,
    action: models.IAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
});
