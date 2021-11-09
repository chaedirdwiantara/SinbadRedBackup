/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type AuthVerifyOTPProps = models.DetailItemProps<models.AuthData>;
/** === INITIAL STATE HERE === */
export const authVerifyOTPInitialState: AuthVerifyOTPProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const authVerifyOTPReducer = simplifyReducer(authVerifyOTPInitialState, {
  /** => process */
  [types.VERIFICATION_OTP_PROCESS](state = authVerifyOTPInitialState) {
    return {
      ...state,
      loading: true,
      error: null,
    };
  },
  /** => success */
  [types.VERIFICATION_OTP_SUCCESS](
    state = authVerifyOTPInitialState,
    action: models.VerificationOTPSuccessAction,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => failed */
  [types.VERIFICATION_OTP_FAILED](
    state = authVerifyOTPInitialState,
    action: models.VerificationOTPFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => reset */
  [types.VERIFICATION_OTP_RESET]() {
    return authVerifyOTPInitialState;
  },
});
