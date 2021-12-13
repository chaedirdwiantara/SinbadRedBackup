/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type StockInformationInitialProps =
  models.DetailItemProps<models.IStockInformationSuccess>;
/** === INITIAL STATE === */
export const stockInformationInitialState: StockInformationInitialProps = {
  data: null,
  loading: false,
  refresh: false,
  error: null,
};
/** === REDUCER === */
export const stockInformationReducer = simplifyReducer(
  stockInformationInitialState,
  {
    /** => Process */
    [types.STOCK_INFORMATION_PROCESS]() {
      return {
        ...stockInformationInitialState,
        loading: true,
      };
    },
    /** => Succeeded */
    [types.STOCK_INFORMATION_SUCCESS](
      state = stockInformationInitialState,
      { payload }: models.DetailSuccessAction<models.IStockInformationSuccess>,
    ) {
      return {
        ...state,
        data: payload.data,
        loading: false,
        error: null,
      };
    },
    /** => Failed */
    [types.STOCK_INFORMATION_FAILED](
      state = stockInformationInitialState,
      { payload }: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
    /** => Refresh */
    [types.STOCK_INFORMATION_REFRESH]() {
      return {
        ...stockInformationInitialState,
        refresh: true,
      };
    },
    /** => Reset */
    [types.STOCK_INFORMATION_RESET]() {
      return stockInformationInitialState;
    },
  },
);
