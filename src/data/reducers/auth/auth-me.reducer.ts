import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';

/** === INITIAL STATE === */
const authMeInitialState = {
  data: null,
  loading: false,
  error: null,
};
/** === REDUCER === */
export const AuthMeReducer = simplifyReducer(authMeInitialState, {
  /** => Process */
  [types.AUTH_ME_PROCESS]() {
    return { ...authMeInitialState, loading: true };
  },
  /** Success */
  [types.AUTH_ME_SUCCESS](
    state = authMeInitialState,
    action: models.DetailSuccessAction<models.AuthMeSuccess>,
  ) {
    return {
      ...state,
      loading: false,
      data: action.payload.data,
    };
  },
  /** Failed */
  [types.AUTH_ME_FAILED](
    state = authMeInitialState,
    action: models.DetailFailedAction,
  ) {
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  },
  /** Reset */
  [types.AUTH_ME_RESET]() {
    return authMeInitialState;
  },
});
