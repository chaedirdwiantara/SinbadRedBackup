/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type StockValidationInitialProps =
  models.DetailItemProps<models.IStockValidaitonSuccess>;
/** === INITIAL STATE === */
export const stockValidationInitialState: StockValidationInitialProps = {
  data: null,
  loading: false,
  refresh: false,
  error: null,
};
/** === REDUCER === */
export const stockValidationReducer = simplifyReducer(
  stockValidationInitialState,
  {
    /** => Process */
    [types.STOCK_VALIDATION_PROCESS]() {
      return {
        ...stockValidationInitialState,
        loading: true,
      };
    },
    /** => Succeeded */
    [types.STOCK_VALIDATION_SUCCESS](
      state = stockValidationInitialState,
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
    [types.STOCK_VALIDATION_FAILED](
      state = stockValidationInitialState,
      { payload }: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
    /** => Refresh */
    [types.STOCK_VALIDATION_REFRESH]() {
      return {
        ...stockValidationInitialState,
        refresh: true,
      };
    },
    /** => Reset */
    [types.STOCK_VALIDATION_RESET]() {
      return stockValidationInitialState;
    },
  },
);
