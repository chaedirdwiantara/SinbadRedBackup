/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type AuthRequestOTPProps = models.DetailItemProps<models.OtpData>;
/** === INITIAL STATE HERE === */
export const authRequestOTPInitialState: AuthRequestOTPProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const authRequestOTPReducer = simplifyReducer(
  authRequestOTPInitialState,
  {
    /** => process */
    [types.REQUEST_OTP_PROCESS](state = authRequestOTPInitialState) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => success */
    [types.REQUEST_OTP_SUCCESS](
      state = authRequestOTPInitialState,
      action: models.RequestOTPSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.REQUEST_OTP_FAILED](
      state = authRequestOTPInitialState,
      action: models.RequestOTPFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.REQUEST_OTP_RESET]() {
      return authRequestOTPInitialState;
    },
  },
);
