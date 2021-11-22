/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type ReserveStockCreateInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const reserveStockCreateInitialState: ReserveStockCreateInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const reserveStockCreateReducer = simplifyReducer(
  reserveStockCreateInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.CREATE_RESERVE_STOCK_PROCESS]() {
      return {
        ...reserveStockCreateInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.CREATE_RESERVE_STOCK_SUCCESS](
      state = reserveStockCreateInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.CREATE_RESERVE_STOCK_FAILED](
      state = reserveStockCreateInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
);
