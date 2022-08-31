import React, { FC, useReducer, useMemo } from 'react';

import {
  StockReminderContext,
  stockReminderReducer,
  stockReminderInitialState,
} from './stock-reminder.context';
// @ts-ignore
const StockReminderProvider: FC = ({ children }) => {
  const [stateStockReminder, dispatchStockReminder] = useReducer(
    stockReminderReducer,
    stockReminderInitialState,
  );
  const contextValue = useMemo(
    () => ({
      stateStockReminder,
      dispatchStockReminder,
    }),
    [stateStockReminder, dispatchStockReminder],
  );

  return (
    <StockReminderContext.Provider value={contextValue}>
      {children}
    </StockReminderContext.Provider>
  );
};

export { StockReminderProvider, StockReminderContext };
