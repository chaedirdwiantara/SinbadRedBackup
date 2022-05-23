/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type CheckoutTncInitialProps =
  models.DetailItemProps<models.CheckoutTnc>;
/** === INITIAL STATE HERE === */
export const checkoutTncInitialState: CheckoutTncInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const checkoutTncReducer = simplifyReducer(
  checkoutTncInitialState,
  {
    /** ===> DETAIL */
    /** => process */
    [types.CHECKOUT_TNC_PROCESS]() {
      return {
        ...checkoutTncInitialState,
        loading: true,
      };
    },
    /** => success */
    [types.CHECKOUT_TNC_SUCCESS](
      state = checkoutTncInitialState,
      action: models.DetailSuccessAction<models.CheckoutTnc>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.CHECKOUT_TNC_FAILED](
      state = checkoutTncInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.CHECKOUT_TNC_RESET]() {
      return checkoutTncInitialState;
    },
    /** => process */
    [types.CHECKOUT_TNC_LOADING]() {
      return {
        ...checkoutTncInitialState,
        loading: true,
      };
    },
  },
);