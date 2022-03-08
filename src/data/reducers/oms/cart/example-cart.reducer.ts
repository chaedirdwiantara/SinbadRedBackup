/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type CartExampleInitialProps =
  models.DetailItemProps<models.CartExample>;
/** === INITIAL STATE HERE === */
export const cartExampleInitialState: CartExampleInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const cartExampleReducer = simplifyReducer(cartExampleInitialState, {
  /** => PROCESS */
  [types.CART_EXAMPLE_PROCESS]() {
    return {
      ...cartExampleInitialState,
      loading: true,
    };
  },
  /** => SUCCESS */
  [types.CART_EXAMPLE_SUCCESS](
    state = cartExampleInitialState,
    action: models.DetailSuccessAction<models.CartExample>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => FAILED */
  [types.CART_EXAMPLE_FAILED](
    state = cartExampleInitialState,
    action: models.DetailFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** REFRESH */
  [types.CART_EXAMPLE_REFRESH]() {
    return {
      ...cartExampleInitialState,
      loading: true,
    };
  },
  /** => RESET */
  [types.CART_EXAMPLE_RESET]() {
    return cartExampleInitialState;
  },
});
