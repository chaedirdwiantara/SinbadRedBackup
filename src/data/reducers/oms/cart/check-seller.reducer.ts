/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type CheckSellerInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const checkSellerInitialState: CheckSellerInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const checkSellerReducer = simplifyReducer(checkSellerInitialState, {
  /** => PROCESS */
  [types.CHECK_SELLER_PROCESS]() {
    return {
      ...checkSellerInitialState,
      loading: true,
    };
  },
  /** => SUCCESS */
  [types.CHECK_SELLER_SUCCESS](
    state = checkSellerInitialState,
    action: models.CreateSuccessV3Action<models.CheckSellerResponse[]>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => FAILED */
  [types.CHECK_SELLER_FAILED](
    state = checkSellerInitialState,
    action: models.CreateFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => RESET */
  [types.CHECK_SELLER_RESET]() {
    return checkSellerInitialState;
  },
});
