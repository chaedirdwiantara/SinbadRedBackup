/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type CancelStockInitialProps = models.DeleteItemV3Props;
/** === INITIAL STATE HERE === */
export const cancelStockInitialState: CancelStockInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const cancelStockReducer = simplifyReducer(cancelStockInitialState, {
  /** => PROCESS */
  [types.CANCEL_STOCK_PROCESS]() {
    return {
      ...cancelStockInitialState,
      loading: false,
    };
  },
  /** => SUCCESS */
  [types.CANCEL_STOCK_SUCCESS](
    state = cancelStockInitialState,
    action: models.DeleteSuccessV3Action,
  ) {
    return {
      ...state,
      data: action.payload.message,
      loading: false,
    };
  },
  /** => FAILED */
  [types.CANCEL_STOCK_FAILED](
    state = cancelStockInitialState,
    action: models.DeleteFailedAction,
  ) {
    return {
      ...state,
      loading: false,
      error: action.payload,
    };
  },
  /** => RESET */
  [types.CANCEL_STOCK_RESET]() {
    return cancelStockInitialState;
  },
});
