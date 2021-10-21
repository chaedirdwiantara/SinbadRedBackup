/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type VerificationEmailInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const verificationEmailInitialState: VerificationEmailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const verificationEmailReducer = simplifyReducer(
  verificationEmailInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.VERIFICATION_EMAIL_PROCESS]() {
      return {
        ...verificationEmailInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.VERIFICATION_EMAIL_SUCCESS](
      state = verificationEmailInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.VERIFICATION_EMAIL_FAILED](
      state = verificationEmailInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.VERIFICATION_EMAIL_RESET]() {
      return verificationEmailInitialState;
    },
  },
);
