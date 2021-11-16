/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type VerificationMobilePhoneInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const verificationMobilePhoneInitialState: VerificationMobilePhoneInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const verificationMobilePhoneReducer = simplifyReducer(
  verificationMobilePhoneInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.VERIFICATION_MOBILE_PHONE_PROCESS]() {
      return {
        ...verificationMobilePhoneInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.VERIFICATION_MOBILE_PHONE_SUCCESS](
      state = verificationMobilePhoneInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.VERIFICATION_MOBILE_PHONE_FAILED](
      state = verificationMobilePhoneInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.VERIFICATION_MOBILE_PHONE_RESET]() {
      return verificationMobilePhoneInitialState;
    },
  },
);
