import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const completeData = simplifyReducer(INITIAL_STATE, {
  [types.GET_COMPLETE_DATA_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.REFETCH_COMPLETE_DATA_PROCESS](state = INITIAL_STATE) {
    return { ...state };
  },

  [types.GET_COMPLETE_DATA_SUCCESS](
    state = INITIAL_STATE,
    action: models.IAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload?.data,
    };
  },

  [types.GET_COMPLETE_DATA_FAILED](
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
