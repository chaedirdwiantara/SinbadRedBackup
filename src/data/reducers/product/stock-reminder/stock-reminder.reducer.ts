import {
  stockReminderListReducer,
  stockReminderListInitialState,
} from './stock-reminder-list.reducer';

import type { StockReminderInitialProps } from './stock-reminder-list.reducer';

/** === TYPES === */
export interface StockReminderState {
  list: StockReminderInitialProps;
}
/** === INITIAL STATE === */
export const stockReminderInitialState: StockReminderState = {
  list: stockReminderListInitialState,
};
/** === REDUCER === */
export const stockReminderReducer = (
  { list }: StockReminderState,
  action: any,
) => ({
  list: stockReminderListReducer(list, action),
});
