/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type AddToCartInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const addToCartInitialState: AddToCartInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const addToCartReducer = simplifyReducer(addToCartInitialState, {
  /** => Process */
  [types.ADD_TO_CART_PROCESS]() {
    return {
      ...addToCartInitialState,
      loading: true,
    };
  },
  /** => Succeeded */
  [types.ADD_TO_CART_SUCCESS](
    state = addToCartInitialState,
    action: models.CreateSuccessAction,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => Failed */
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
  /** Refresh */
  [types.ADD_TO_CART_REFRESH]() {
    return {
      ...addToCartInitialState,
      loading: true,
    };
  },
  /** => Reset */
  [types.ADD_TO_CART_RESET]() {
    return addToCartInitialState;
  },
});
