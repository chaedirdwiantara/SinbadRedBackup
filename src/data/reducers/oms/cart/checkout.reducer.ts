/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type CheckoutInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const checkoutInitialState: CheckoutInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const checkoutReducer = simplifyReducer(checkoutInitialState, {
  /** => create process */
  [types.CHECKOUT_PROCESS]() {
    return {
      ...checkoutInitialState,
      loading: true,
    };
  },
  /** => create success */
  [types.CHECKOUT_SUCCESS](
    state = checkoutInitialState,
    action: models.CreateSuccessAction,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => create failed */
  [types.CHECKOUT_FAILED](
    state = checkoutInitialState,
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
    return checkoutInitialState;
  },
});
