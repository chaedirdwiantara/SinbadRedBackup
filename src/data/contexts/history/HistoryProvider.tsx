import React, { FC, useReducer, useMemo } from 'react';

import {
  HistoryContext,
  historyReducer,
  historyInitialState,
} from './history.context';

const HistoryProvider: FC = ({ children }) => {
  const [stateHistory, dispatchHistory] = useReducer(
    historyReducer,
    historyInitialState,
  );
  const contextValue = useMemo(
    () => ({
      stateHistory,
      dispatchHistory,
    }),
    [stateHistory, dispatchHistory],
  );

  return (
    <HistoryContext.Provider value={contextValue}>
      {children}
    </HistoryContext.Provider>
  );
};

export { HistoryProvider, HistoryContext };
