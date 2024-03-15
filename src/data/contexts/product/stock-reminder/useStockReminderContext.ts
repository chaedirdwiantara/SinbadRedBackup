import { useContext } from 'react';

import { StockReminderContext } from './stock-reminder.context';

export const useStockReminderContext = () => {
  const context = useContext(StockReminderContext);

  if (context === undefined) {
    throw new Error(
      'useStockReminderContext was used outside of StockReminderProvider',
    );
  }

  return context;
};
