import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const ocrImage = simplifyReducer(INITIAL_STATE, {
  [types.OCR_IMAGE_RESET]() {
    return INITIAL_STATE;
  },

  [types.OCR_IMAGE_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.OCR_IMAGE_SUCCESS](
    state = INITIAL_STATE,
    action: models.IAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  },

  [types.OCR_IMAGE_FAILED](state = INITIAL_STATE, action: models.IAction<any>) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
});
