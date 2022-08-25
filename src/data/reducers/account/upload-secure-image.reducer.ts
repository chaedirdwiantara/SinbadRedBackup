import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const uploadSecureImage = simplifyReducer(INITIAL_STATE, {
  [types.UPLOAD_SECURE_IMAGE_RESET]() {
    return INITIAL_STATE;
  },

  [types.UPLOAD_SECURE_IMAGE_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.UPLOAD_SECURE_IMAGE_SUCCESS](
    state = INITIAL_STATE,
    action: models.IAction<any>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload,
    };
  },

  [types.UPLOAD_SECURE_IMAGE_FAILED](state = INITIAL_STATE, action: models.IAction<any>) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
});
