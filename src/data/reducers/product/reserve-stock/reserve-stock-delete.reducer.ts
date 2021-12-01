/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type ReserveStockDeleteInitialProps = models.DeleteItemProps;
/** === INITIAL STATE HERE === */
export const reserveStockDeleteInitialState: ReserveStockDeleteInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const reserveStockDeleteReducer = simplifyReducer(
  reserveStockDeleteInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.DELETE_RESERVE_STOCK_PROCESS]() {
      return {
        ...reserveStockDeleteInitialState,
        loading: true,
      };
    },
    /** => detail success */
    [types.DELETE_RESERVE_STOCK_SUCCESS](
      state = reserveStockDeleteInitialState,
      action: models.DeleteSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload,
        loading: false,
      };
    },
    /** => detail failed */
    [types.DELETE_RESERVE_STOCK_FAILED](
      state = reserveStockDeleteInitialState,
      action: models.DeleteFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
);
