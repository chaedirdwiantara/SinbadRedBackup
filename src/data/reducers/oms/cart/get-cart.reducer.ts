/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type GetCartInitialProps = models.DetailItemProps<models.GetCartData>;
/** === INITIAL STATE HERE === */
export const getCartInitialState: GetCartInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const getCartReducer = simplifyReducer(getCartInitialState, {
  /** => PROCESS */
  [types.GET_CART_PROCESS]() {
    return {
      ...getCartInitialState,
      loading: true,
    };
  },
  /** => SUCCESS */
  [types.GET_CART_SUCCESS](
    state = getCartInitialState,
    action: models.DetailSuccessAction<models.GetCartData>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => FAILED */
  [types.GET_CART_FAILED](
    state = getCartInitialState,
    action: models.DetailFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** REFRESH */
  [types.GET_CART_REFRESH]() {
    return {
      ...getCartInitialState,
      loading: true,
    };
  },
  /** => RESET */
  [types.GET_CART_RESET]() {
    return getCartInitialState;
  },
});
