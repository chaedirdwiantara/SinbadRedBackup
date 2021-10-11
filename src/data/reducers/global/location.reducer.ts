import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
// import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const locations = simplifyReducer(INITIAL_STATE, {
  [types.GET_LOCATION_RESET]() {
    return INITIAL_STATE;
  },

  [types.GET_LOCATION_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.GET_LOCATION_SUCCESS](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      loading: false,
      data: action.payload.data,
    };
  },

  [types.GET_LOCATION_FAILED](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
});
