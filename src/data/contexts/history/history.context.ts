import React from 'react';
import {
  HistoryListState,
  historyInitialState,
  historyReducer,
} from '@reducer/history/history.reducer';
const HistoryContext = React.createContext<{
  // state: InitialStateType;
  stateHistory: HistoryListState;
  dispatchHistory: React.Dispatch<any>;
}>({
  // state: initialState,
  stateHistory: historyInitialState,
  dispatchHistory: () => null,
});

export { HistoryContext, historyReducer, historyInitialState };
