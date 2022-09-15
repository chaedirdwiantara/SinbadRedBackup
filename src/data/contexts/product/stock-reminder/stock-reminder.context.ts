import { createContext, Dispatch } from 'react';

import {
  stockReminderInitialState,
  stockReminderReducer,
} from '@reducer/product/stock-reminder/stock-reminder.reducer';

import type { StockReminderState } from '@reducer/product/stock-reminder/stock-reminder.reducer';

const StockReminderContext = createContext<{
  stateStockReminder: StockReminderState;
  dispatchStockReminder: Dispatch<any>;
}>({
  stateStockReminder: stockReminderInitialState,
  dispatchStockReminder: () => null,
});

export {
  StockReminderContext,
  stockReminderReducer,
  stockReminderInitialState,
};
