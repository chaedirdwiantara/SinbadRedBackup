/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
import { AddToCartResponse } from '@models';
/** === TYPE HERE === */
export type AddToCartInitialProps = models.CreateItemV3Props<AddToCartResponse>;
/** === INITIAL STATE HERE === */
export const addToCartInitialState: AddToCartInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const addToCartReducer = simplifyReducer(addToCartInitialState, {
  /** => PROCESS */
  [types.ADD_TO_CART_PROCESS]() {
    return {
      ...addToCartInitialState,
      loading: true,
    };
  },
  /** => SUCCESS */
  [types.ADD_TO_CART_SUCCESS](
    state = addToCartInitialState,
    action: models.CreateSuccessV3Action<models.AddToCartResponse>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => FAILED */
  [types.ADD_TO_CART_FAILED](
    state = addToCartInitialState,
    action: models.CreateFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => RESET */
  [types.ADD_TO_CART_RESET]() {
    return addToCartInitialState;
  },
});
