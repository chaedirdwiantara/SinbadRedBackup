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
    action: models.DetailSuccessAction<models.CartSuccessProps>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => Failed */
  [types.CART_VIEW_FAILED](
    state = cartViewInitialState,
    action: models.DetailFailedAction,
  ) {
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  },
  /** => Refresh */
  [types.TAG_LIST_REFRESH]() {
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
