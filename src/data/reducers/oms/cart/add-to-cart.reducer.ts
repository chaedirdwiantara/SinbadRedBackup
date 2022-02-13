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
/** === FUNCTION HERE === */
export const addToCartReducer = simplifyReducer(addToCartInitialState, {
  /** => create process */
  [types.ADD_TO_CART_PROCESS]() {
    return {
      ...addToCartInitialState,
      loading: true,
    };
  },
  /** => create success */
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
  /** => create failed */
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
  /** => create reset */
  [types.ADD_TO_CART_RESET]() {
    return addToCartInitialState;
  },
});
