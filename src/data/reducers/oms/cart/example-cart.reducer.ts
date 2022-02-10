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
  /** => Process */
  [types.CART_EXAMPLE_PROCESS]() {
    return {
      ...cartExampleInitialState,
      loading: true,
    };
  },
  /** => Succeeded */
  [types.CART_EXAMPLE_SUCCESS](
    state = cartExampleInitialState,
    action: models.CreateSuccessAction,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => Failed */
  [types.CART_EXAMPLE_FAILED](
    state = cartExampleInitialState,
    action: models.CreateFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** Refresh */
  [types.CART_EXAMPLE_REFRESH]() {
    return {
      ...cartExampleInitialState,
      loading: true,
    };
  },
  /** => Reset */
  [types.CART_EXAMPLE_RESET]() {
    return cartExampleInitialState;
  },
});
