/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type CartCheckedoutInitialProps = models.UpdateItemProps;
/** === INITIAL STATE HERE === */
export const cartCheckedoutInitialState: CartCheckedoutInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const cartCheckedoutReducer = simplifyReducer(
  cartCheckedoutInitialState,
  {
    /** => Process */
    [types.CART_CHECKEDOUT_PROCESS]() {
      return {
        ...cartCheckedoutInitialState,
        loading: true,
      };
    },
    /** => Succeeded */
    [types.CART_CHECKEDOUT_SUCCESS](
      state = cartCheckedoutInitialState,
      action: models.UpdateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
        error: null,
      };
    },
    /** => Failed */
    [types.CART_CHECKEDOUT_FAILED](
      state = cartCheckedoutInitialState,
      action: models.UpdateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** Refresh */
    [types.CART_CHECKEDOUT_REFRESH]() {
      return {
        ...cartCheckedoutInitialState,
        loading: true,
      };
    },
    /** => Reset */
    [types.CART_CHECKEDOUT_RESET]() {
      return cartCheckedoutInitialState;
    },
  },
);
