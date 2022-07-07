import simplifyReducer from '@core/redux/simplifyReducer';
import * as types from '@types';
import * as models from '@models';

const INITIAL_STATE = {
  data: null,
  loading: false,
  error: null,
};

export const updateUserMedeaData = simplifyReducer(INITIAL_STATE, {
  [types.UPDATE_USER_MEDEA_PROCESS]() {
    return { ...INITIAL_STATE, loading: true };
  },

  [types.UPDATE_USER_MEDEA_SUCCESS](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.IUpdateUserMedeaSuccess>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload.data,
    };
  },

  [types.UPDATE_USER_MEDEA_FAILED](
    state = INITIAL_STATE,
    action: models.IRegisterAction<models.IUserMedeaFailed>,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },

  [types.UPDATE_USER_MEDEA_RESET]() {
    return INITIAL_STATE;
  },
});
