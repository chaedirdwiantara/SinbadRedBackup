import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';

const INITIAL_STATE = {
  data: [],
  loading: false,
  error: null,
};

export const searchLocations = simplifyReducer(INITIAL_STATE, {
  [types.SEARCH_LOCATION_RESET]() {
    return INITIAL_STATE;
  },

  [types.SEARCH_LOCATION_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.SEARCH_LOCATION_SUCCESS](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      loading: false,
      data: action.payload.data,
    };
  },

  [types.SEARCH_LOCATION_FAILED](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
});
