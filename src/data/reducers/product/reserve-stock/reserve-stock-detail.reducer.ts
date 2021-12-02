/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
type ReserveStockDetailInitialProps =
  models.DetailItemProps<models.ReserveStockError>;
/** === INITIAL STATE HERE === */
export const reserveStockDetailInitialState: ReserveStockDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const reserveStockDetailReducer = simplifyReducer(
  reserveStockDetailInitialState,
  {
    /** ===> DETAIL */
    /** => detail process */
    [types.DETAIL_RESERVE_STOCK_PROCESS](
      state = reserveStockDetailInitialState,
    ) {
      return {
        ...state,
        loading: true,
        error: null,
      };
    },
    /** => detail success */
    [types.DETAIL_RESERVE_STOCK_SUCCESS](
      state = reserveStockDetailInitialState,
      action: models.DetailSuccessAction<models.PotentialPromoProductProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => detail failed */
    [types.DETAIL_RESERVE_STOCK_FAILED](
      state = reserveStockDetailInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => detail reset */
    [types.DETAIL_RESERVE_STOCK_RESET]() {
      return reserveStockDetailInitialState;
    },
  },
);
