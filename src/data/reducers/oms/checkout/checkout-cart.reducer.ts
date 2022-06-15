/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type CheckoutCartInitialProps =
  models.CreateItemV3Props<models.CheckoutResponse>;
/** === INITIAL STATE HERE === */
export const checkoutCartInitialState: CheckoutCartInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const checkoutCartReducer = simplifyReducer(checkoutCartInitialState, {
  /** => create process */
  [types.CHECKOUT_PROCESS]() {
    return {
      ...checkoutCartInitialState,
      loading: true,
    };
  },
  /** => create success */
  [types.CHECKOUT_SUCCESS](
    state = checkoutCartInitialState,
    action: models.CreateSuccessV3Action<models.CheckoutPayload>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => create failed */
  [types.CHECKOUT_FAILED](
    state = checkoutCartInitialState,
    action: models.CreateFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => create reset */
  [types.CHECKOUT_RESET]() {
    return checkoutCartInitialState;
  },
});
