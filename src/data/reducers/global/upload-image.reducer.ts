import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
// import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const uploadedImage = simplifyReducer(INITIAL_STATE, {
  [types.UPLOAD_IMAGE_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.UPLOAD_IMAGE_SUCCESS](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      loading: false,
      data: action.payload.data,
    };
  },

  [types.UPLOAD_IMAGE_FAILED](state = INITIAL_STATE, action: any) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.UPLOAD_IMAGE_RESET]() {
    return INITIAL_STATE;
  },
});
