/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type VerificationBankAccountInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const verificationBankAccountInitialState: VerificationBankAccountInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const verificationBankAccountReducer = simplifyReducer(
  verificationBankAccountInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.VERIFICATION_BANK_ACCOUNT_PROCESS]() {
      return {
        ...verificationBankAccountInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.VERIFICATION_BANK_ACCOUNT_SUCCESS](
      state = verificationBankAccountInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.VERIFICATION_BANK_ACCOUNT_FAILED](
      state = verificationBankAccountInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.VERIFICATION_BANK_ACCOUNT_RESET]() {
      return verificationBankAccountInitialState;
    },
  },
);
