/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type CartViewInitialProps =
  models.DetailItemProps<models.CartSuccessProps>;
/** === INITIAL STATE === */
export const cartViewInitialState: CartViewInitialProps = {
  data: null,
  error: null,
  loading: false,
  refresh: false,
};
/** === REDUCER === */
export const cartViewReducer = simplifyReducer(cartViewInitialState, {
  /** => Process */
  [types.CART_VIEW_PROCESS]() {
    return {
      ...cartViewInitialState,
      loading: true,
    };
  },
  /** => Success */
  [types.CART_VIEW_SUCCESS](
    state = cartViewInitialState,
    { payload }: models.DetailSuccessAction<models.CartSuccessProps>,
  ) {
    return {
      ...state,
      data: payload.data,
      loading: false,
      error: null,
    };
  },
  /** => Failed */
  [types.CART_VIEW_FAILED](
    state = cartViewInitialState,
    { payload }: models.DetailFailedAction,
  ) {
    return {
      ...state,
      error: payload,
      loading: false,
    };
  },
  /** => Refresh */
  [types.CART_VIEW_REFRESH]() {
    return {
      ...cartViewInitialState,
      loading: true,
    };
  },
  /** => Reset */
  [types.CART_VIEW_RESET]() {
    return cartViewInitialState;
  },
});
