import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const updateCompleteData = simplifyReducer(INITIAL_STATE, {
  [types.UPDATE_COMPLETE_DATA_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.UPDATE_COMPLETE_DATA_SUCCESS](
    state = INITIAL_STATE,
    action: models.IAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload?.data,
    };
  },

  [types.UPDATE_COMPLETE_DATA_FAILED](
    state = INITIAL_STATE,
    action: models.IAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  [types.UPDATE_COMPLETE_DATA_RESET]() {
    return INITIAL_STATE;
  },
});
