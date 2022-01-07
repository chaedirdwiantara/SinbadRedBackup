/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type CheckoutViewInitialProps =
  models.DetailItemProps<models.CheckoutSuccess>;
/** === INITIAL STATE === */
export const checkoutViewInitialState: CheckoutViewInitialProps = {
  data: null,
  error: null,
  loading: false,
  refresh: false,
};
/** === REDUCER === */
export const checkoutViewReducer = simplifyReducer(checkoutViewInitialState, {
  /** => Process */
  [types.GET_CHECKOUT_PROCESS]() {
    return {
      ...checkoutViewInitialState,
      loading: true,
    };
  },
  /** => Success */
  [types.GET_CHECKOUT_SUCCESS](
    state = checkoutViewInitialState,
    action: models.DetailSuccessAction<models.CheckoutSuccess>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      error: null,
      loading: false,
    };
  },
  /** => Failed */
  [types.GET_CHECKOUT_FAILED](
    state = checkoutViewInitialState,
    action: models.DetailFailedAction,
  ) {
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  },
  /** => Refresh */
  [types.GET_CHECKOUT_REFRESH]() {
    return {
      ...checkoutViewInitialState,
      loading: true,
    };
  },
  /** => Reset */
  [types.GET_CHECKOUT_RESET]() {
    return checkoutViewInitialState;
  },
});
