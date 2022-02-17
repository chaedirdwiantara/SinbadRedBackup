/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type CheckStockInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const checkStockInitialState: CheckStockInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const checkStockReducer = simplifyReducer(checkStockInitialState, {
  /** => PROCESS */
  [types.CHECK_STOCK_PROCESS]() {
    return {
      ...checkStockInitialState,
      loading: true,
    };
  },
  /** => SUCCESS */
  [types.CHECK_STOCK_SUCCESS](
    state = checkStockInitialState,
    action: models.CreateSuccessV3Action<models.CheckStockResponse[]>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** => FAILED */
  [types.CHECK_STOCK_FAILED](
    state = checkStockInitialState,
    action: models.CreateFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => RESET */
  [types.CHECK_STOCK_RESET]() {
    return checkStockInitialState;
  },
});
