import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  isLoadMoreLoading: false,
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
      data: action.payload,
    };
  },

  [types.SEARCH_LOCATION_FAILED](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  [types.LOAD_MORE_SEARCH_LOCATION_PROCESS](state: any) {
    return { ...state, isLoadMoreLoading: true };
  },

  [types.LOAD_MORE_SEARCH_LOCATION_SUCCESS](
    state: any = INITIAL_STATE,
    action: any,
  ) {
    const newData = {
      data: [...state.data?.data, ...action.payload.data],
      meta: action.payload.meta,
    };
    return {
      ...state,
      isLoadMoreLoading: false,
      data: newData,
    };
  },

  [types.LOAD_MORE_SEARCH_LOCATION_FAILED](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      isLoadMoreLoading: false,
      error: action.payload,
    };
  },
});
