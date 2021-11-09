/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type AuthLoginUsernameProps = models.DetailItemProps<models.AuthData>;
/** === INITIAL STATE HERE === */
export const authLoginUsernameInitialState: AuthLoginUsernameProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const authLoginUsernameReducer = simplifyReducer(
  authLoginUsernameInitialState,
  {
    /** => process */
    [types.LOGIN_USERNAME_PROCESS](state = authLoginUsernameInitialState) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => success */
    [types.LOGIN_USERNAME_SUCCESS](
      state = authLoginUsernameInitialState,
      action: models.LoginUserNameSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.LOGIN_USERNAME_FAILED](
      state = authLoginUsernameInitialState,
      action: models.LoginUserNameFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.LOGIN_USERNAME_RESET]() {
      return authLoginUsernameInitialState;
    },
  },
);
