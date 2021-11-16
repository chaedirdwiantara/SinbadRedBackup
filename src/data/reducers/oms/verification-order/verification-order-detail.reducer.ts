/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type VerificationOrderDetailInitialProps = models.DetailItemProps<{}>;
/** === INITIAL STATE HERE === */
export const verificationOrderDetailInitialState: VerificationOrderDetailInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const verificationOrderDetailReducer = simplifyReducer(
  verificationOrderDetailInitialState,
  {
    /** ===> DETAIL */
    /** => process */
    [types.VERIFICATION_ORDER_DETAIL_PROCESS]() {
      return {
        ...verificationOrderDetailInitialState,
        loading: true,
      };
    },
    /** => success */
    [types.VERIFICATION_ORDER_DETAIL_SUCCESS](
      state = verificationOrderDetailInitialState,
      action: models.DetailSuccessAction<models.VerificationOrderDetailProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.VERIFICATION_ORDER_DETAIL_FAILED](
      state = verificationOrderDetailInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.VERIFICATION_ORDER_DETAIL_RESET]() {
      return verificationOrderDetailInitialState;
    },
    /** => process */
    [types.VERIFICATION_ORDER_DETAIL_LOADING]() {
      return {
        ...verificationOrderDetailInitialState,
        loading: true,
      };
    },
  },
);
