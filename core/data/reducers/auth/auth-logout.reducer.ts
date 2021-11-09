/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type AuthLogoutProps = models.DetailItemProps<models.LogoutSuccess>;
/** === INITIAL STATE HERE === */
export const authLogoutInitialState: AuthLogoutProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const authLogoutReducer = simplifyReducer(authLogoutInitialState, {
  /** => process */
  [types.LOGOUT_PROCESS](state = authLogoutInitialState) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },
  /** => success */
  [types.LOGOUT_SUCCESS](
    state = authLogoutInitialState,
    action: models.LogoutSuccessAction,
  ) {
    return {
      ...state,
      data: action.payload,
      loading: false,
    };
  },
  /** => failed */
  [types.LOGOUT_FAILED](
    state = authLogoutInitialState,
    action: models.LogoutFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => reset */
  [types.LOGOUT_RESET]() {
    return authLogoutInitialState;
  },
});
