import React from 'react';
import {
  HistoryContext,
  historyReducer,
  historyInitialState,
} from './history.context';
const HistoryProvider: React.FC = ({ children }) => {
  const [stateHistory, dispatchHistory] = React.useReducer(
    historyReducer,
    historyInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateHistory,
      dispatchHistory,
    }),
    [stateHistory, dispatchHistory],
  );
  return (
    <HistoryContext.Provider value={valueProvider}>
      {children}
    </HistoryContext.Provider>
  );
};

export { HistoryProvider, HistoryContext };
