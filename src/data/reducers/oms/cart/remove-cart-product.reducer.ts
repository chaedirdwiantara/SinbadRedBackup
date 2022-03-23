/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type RemoveCartProductInitialProps = models.DeleteItemV3Props;
/** === INITIAL STATE HERE === */
export const removeCartProductInitialState: RemoveCartProductInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const removeCartProductReducer = simplifyReducer(
  removeCartProductInitialState,
  {
    /** => PROCESS */
    [types.REMOVE_CART_PRODUCT_PROCESS]() {
      return {
        ...removeCartProductInitialState,
        loading: true,
      };
    },
    /** => SUCCESS */
    [types.REMOVE_CART_PRODUCT_SUCCESS](
      state = removeCartProductInitialState,
      action: models.DeleteSuccessV3Action,
    ) {
      return {
        ...state,
        data: action.payload.message,
        loading: false,
      };
    },
    /** => FAILED */
    [types.REMOVE_CART_PRODUCT_FAILED](
      state = removeCartProductInitialState,
      action: models.DeleteFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => RESET */
    [types.REMOVE_CART_PRODUCT_RESET]() {
      return removeCartProductInitialState;
    },
  },
);
