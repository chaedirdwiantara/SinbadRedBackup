/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type VerificationOrderCreateInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const verificationOrderCreateInitialState: VerificationOrderCreateInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const verificationOrderCreateReducer = simplifyReducer(
  verificationOrderCreateInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.VERIFICATION_ORDER_CREATE_PROCESS]() {
      return {
        ...verificationOrderCreateInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.VERIFICATION_ORDER_CREATE_SUCCESS](
      state = verificationOrderCreateInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.VERIFICATION_ORDER_CREATE_FAILED](
      state = verificationOrderCreateInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.VERIFICATION_ORDER_CREATE_RESET]() {
      return verificationOrderCreateInitialState;
    },
  },
);
