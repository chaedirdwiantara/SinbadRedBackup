/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
import { isNumber } from 'lodash';
/** === TYPE === */
export type StockReminderInitialProps = models.StockReminderListItemProps;
/** === INITIAL STATE === */
export const stockReminderListInitialState: StockReminderInitialProps = {
  data: [],
  loading: false,
};
/** === REDUCER === */
export const stockReminderListReducer = simplifyReducer(
  stockReminderListInitialState,
  {
    /** => Process */
    [types.STOCK_REMINDER_LIST_PROCESS](
      state = stockReminderListInitialState,
      { payload }: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: payload.loading,
      };
    },
    /** => Succeeded */
    [types.STOCK_REMINDER_LIST_SUCCESS](
      state = stockReminderListInitialState,
      { payload }: models.StockReminderListSuccessAction,
    ) {
      return {
        ...state,
        data: [...state.data, ...payload.data],
      };
    },
    /** => Failed */
    [types.STOCK_REMINDER_LIST_FAILED](
      state = stockReminderListInitialState,
      { payload }: models.ListFailedAction,
    ) {
      return {
        ...state,
      };
    },
    /** => Refresh */
    [types.STOCK_REMINDER_LIST_REFRESH]() {
      return {
        ...stockReminderListInitialState,
        refresh: true,
      };
    },
    /** => Load More */
    [types.STOCK_REMINDER_LIST_LOADMORE](
      state = stockReminderListInitialState,
    ) {
      return {
        ...state,
        loadMore: true,
      };
    },
    /** => Reset */
    [types.STOCK_REMINDER_LIST_RESET]() {
      return stockReminderListInitialState;
    },
    /** => Clear Contents */
    [types.STOCK_REMINDER_LIST_CLEAR_CONTENTS]() {
      return {
        ...stockReminderListInitialState,
        loading: true,
      };
    },
    /** => success create reminder */
    [types.CREATE_STOCK_REMINDER_SUCCESS](
      state = stockReminderListInitialState,
      { payload }: models.CreateStockReminderSuccessAction,
    ) {
      // reoder list stock reminder to set stockRemind to true by findIndex
      const dataListStockReminder = [...state.data];
      const findByIndexList = dataListStockReminder.findIndex(
        (i) =>
          `${i.productId}${i.warehouseId}` ==
          `${payload.productId}${payload.warehouseId}`,
      );
      if (isNumber(findByIndexList)) {
        dataListStockReminder[findByIndexList].stockRemind = true;
      }
      return {
        ...state,
        data: dataListStockReminder,
      };
    },
  },
);
