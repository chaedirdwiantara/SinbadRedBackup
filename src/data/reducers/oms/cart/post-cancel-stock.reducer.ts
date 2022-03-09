/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PostCancelStockInitialProps = models.DeleteItemV3Props;
/** === INITIAL STATE HERE === */
export const postCancelStockInitialState: PostCancelStockInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const postCancelStockReducer = simplifyReducer(
  postCancelStockInitialState,
  {
    /** => PROCESS */
    [types.POST_CANCEL_STOCK_PROCESS]() {
      return {
        ...postCancelStockInitialState,
        loading: false,
      };
    },
    /** => SUCCESS */
    [types.POST_CANCEL_STOCK_SUCCESS](
      state = postCancelStockInitialState,
      action: models.DeleteSuccessV3Action,
    ) {
      return {
        ...state,
        data: action.payload.message,
        loading: false,
      };
    },
    /** => FAILED */
    [types.POST_CANCEL_STOCK_FAILED](
      state = postCancelStockInitialState,
      action: models.DeleteFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => RESET */
    [types.POST_CANCEL_STOCK_RESET]() {
      return postCancelStockInitialState;
    },
  },
);
