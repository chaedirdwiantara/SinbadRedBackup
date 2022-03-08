/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type GetTotalCartInitialProps =
  models.DetailItemProps<models.TotalCartData>;
/** === INITIAL STATE HERE === */
export const getTotalCartInitialState: GetTotalCartInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const getTotalCartReducer = simplifyReducer(getTotalCartInitialState, {
  /** => PROCESS */
  [types.GET_TOTAL_CART_PROCESS]() {
    return {
      ...getTotalCartInitialState,
      loading: true,
    };
  },
  /** => SUCCESS */
  [types.GET_TOTAL_CART_SUCCESS](
    state = getTotalCartInitialState,
    action: models.DetailSuccessAction<models.GetTotalCart>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => FAILED */
  [types.GET_TOTAL_CART_FAILED](
    state = getTotalCartInitialState,
    action: models.DetailFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** REFRESH */
  [types.GET_TOTAL_CART_REFRESH]() {
    return {
      ...getTotalCartInitialState,
      loading: true,
    };
  },
  /** => RESET */
  [types.GET_TOTAL_CART_RESET]() {
    return getTotalCartInitialState;
  },
});
