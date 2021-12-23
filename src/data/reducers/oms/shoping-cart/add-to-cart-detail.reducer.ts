/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type AddToCartDetailInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const addToCartDetailInitialState: AddToCartDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const addToCartDetailReducer = simplifyReducer(
  addToCartDetailInitialState,
  {
    /** => Process */
    [types.ADD_TO_CART_DETAIL_PROCESS]() {
      return {
        ...addToCartDetailInitialState,
        loading: true,
      };
    },
    /** => Succeeded */
    [types.ADD_TO_CART_DETAIL_SUCCESS](
      state = addToCartDetailInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => Failed */
    [types.ADD_TO_CART_DETAIL_FAILED](
      state = addToCartDetailInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** Refresh */
    [types.ADD_TO_CART_DETAIL_REFRESH]() {
      return {
        ...addToCartDetailInitialState,
        loading: true,
      };
    },
    /** => Reset */
    [types.ADD_TO_CART_DETAIL_RESET]() {
      return addToCartDetailInitialState;
    },
  },
);
