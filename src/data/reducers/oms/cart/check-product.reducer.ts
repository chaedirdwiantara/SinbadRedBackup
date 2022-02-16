/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type CheckProductInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const checkProductInitialState: CheckProductInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const checkProductReducer = simplifyReducer(checkProductInitialState, {
  /** => PROCESS */
  [types.CHECK_PRODUCT_PROCESS]() {
    return {
      ...checkProductInitialState,
      loading: true,
    };
  },
  /** => SUCCESS */
  [types.CHECK_PRODUCT_SUCCESS](
    state = checkProductInitialState,
    action: models.CreateSuccessV3Action<models.GetCartDataSellersProducts[]>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => FAILED */
  [types.CHECK_PRODUCT_FAILED](
    state = checkProductInitialState,
    action: models.CreateFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => RESET */
  [types.CHECK_PRODUCT_RESET]() {
    return checkProductInitialState;
  },
});
