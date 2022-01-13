/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type CartUpdateInitialProps = models.UpdateItemProps;
/** === INITIAL STATE HERE === */
export const cartUpdateInitialState: CartUpdateInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const cartUpdateReducer = simplifyReducer(cartUpdateInitialState, {
  /** => Process */
  [types.CART_UPDATE_PROCESS]() {
    return {
      ...cartUpdateInitialState,
      loading: true,
    };
  },
  /** => Succeeded */
  [types.CART_UPDATE_SUCCESS](
    state = cartUpdateInitialState,
    action: models.UpdateSuccessAction,
  ) {
    return {
      ...state,
      data: action.payload.data,
      error: null,
      loading: false,
    };
  },
  /** => Failed */
  [types.CART_UPDATE_FAILED](
    state = cartUpdateInitialState,
    action: models.UpdateFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** Refresh */
  [types.CART_UPDATE_REFRESH]() {
    return {
      ...cartUpdateInitialState,
      loading: true,
    };
  },
  /** => Reset */
  [types.CART_UPDATE_RESET]() {
    return cartUpdateInitialState;
  },
});
