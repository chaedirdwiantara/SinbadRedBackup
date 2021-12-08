/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type StockValidationDetailInitialProps =
  models.DetailItemProps<models.IStockValidaitonSuccess>;
/** === INITIAL STATE === */
export const stockValidationDetailInitialState: StockValidationDetailInitialProps =
  {
    data: null,
    loading: false,
    refresh: false,
    error: null,
  };
/** === REDUCER === */
export const stockValidationDetailReducer = simplifyReducer(
  stockValidationDetailInitialState,
  {
    /** => Process */
    [types.STOCK_VALIDATION_DETAIL_PROCESS]() {
      return {
        ...stockValidationDetailInitialState,
        loading: true,
      };
    },
    /** => Succeeded */
    [types.STOCK_VALIDATION_DETAIL_SUCCESS](
      state = stockValidationDetailInitialState,
      { payload }: models.DetailSuccessAction<models.IStockValidaitonSuccess>,
    ) {
      return {
        ...state,
        data: payload.data,
        loading: false,
        error: null,
      };
    },
    /** => Failed */
    [types.STOCK_VALIDATION_DETAIL_FAILED](
      state = stockValidationDetailInitialState,
      { payload }: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
    /** => Refresh */
    [types.STOCK_VALIDATION_DETAIL_REFRESH]() {
      return {
        ...stockValidationDetailInitialState,
        refresh: true,
      };
    },
    /** => Reset */
    [types.STOCK_VALIDATION_DETAIL_RESET]() {
      return stockValidationDetailInitialState;
    },
  },
);
