/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PostCheckStockInitialProps = models.CreateItemV3Props<
  models.CheckStockResponse[]
>;
/** === INITIAL STATE HERE === */
export const postCheckStockInitialState: PostCheckStockInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const postCheckStockReducer = simplifyReducer(
  postCheckStockInitialState,
  {
    /** => PROCESS */
    [types.POST_CHECK_STOCK_PROCESS]() {
      return {
        ...postCheckStockInitialState,
        loading: true,
      };
    },
    /** => SUCCESS */
    [types.POST_CHECK_STOCK_SUCCESS](
      state = postCheckStockInitialState,
      action: models.CreateSuccessV3Action<models.CheckStockResponse[]>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => FAILED */
    [types.POST_CHECK_STOCK_FAILED](
      state = postCheckStockInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => RESET */
    [types.POST_CHECK_STOCK_RESET]() {
      return postCheckStockInitialState;
    },
  },
);
