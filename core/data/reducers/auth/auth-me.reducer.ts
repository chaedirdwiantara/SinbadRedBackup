/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type AuthMeUsernameProps = models.DetailItemProps<models.AuthData>;
/** === INITIAL STATE HERE === */
export const authMeInitialState: AuthMeUsernameProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const authMeReducer = simplifyReducer(authMeInitialState, {
  /** => process */
  [types.ME_PROCESS](state = authMeInitialState) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },
  /** => success */
  [types.ME_SUCCESS](
    state = authMeInitialState,
    action: models.MeSuccessAction,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => failed */
  [types.ME_FAILED](state = authMeInitialState, action: models.MeFailedAction) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => reset */
  [types.ME_RESET]() {
    return authMeInitialState;
  },
});
