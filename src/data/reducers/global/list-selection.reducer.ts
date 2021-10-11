import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
// import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const listSelection = simplifyReducer(INITIAL_STATE, {
  [types.GET_SELECTION_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.GET_SELECTION_SUCCESS](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      loading: false,
      data: action.payload.data,
    };
  },

  [types.GET_SELECTION_FAILED](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.GET_SELECTION_RESET]() {
    return INITIAL_STATE;
  },
});

export const selectedItem = simplifyReducer(null, {
  [types.SELECTED_ITEM](_state = null, action: any) {
    return action.payload;
  },
});
