import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
// import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
  isLoadMoreLoading: false,
};

export const listSelection = simplifyReducer(INITIAL_STATE, {
  [types.GET_SELECTION_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.GET_SELECTION_SUCCESS](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      loading: false,
      data: action.payload,
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
  [types.LOAD_MORE_SELECTION_PROCESS](state: any) {
    return { ...state, isLoadMoreLoading: true };
  },

  [types.LOAD_MORE_SELECTION_SUCCESS](
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

  [types.LOAD_MORE_SELECTION_FAILED](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      isLoadMoreLoading: false,
      error: action.payload,
    };
  },
});

export const selectedItem = simplifyReducer(null, {
  [types.SELECTED_ITEM](_state = null, action: any) {
    return action.payload;
  },
});
