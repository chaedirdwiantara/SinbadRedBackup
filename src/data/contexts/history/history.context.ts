import React from 'react';
import {
    HistoryInitialProps,
    historyInitialState,
    historyReducer,
} from '@reducer/history/history.reducer';
const HistoryContext = React.createContext<{
  // state: InitialStateType;
  stateHistory: HistoryInitialProps;
  dispatchHistory: React.Dispatch<any>;
}>({
  // state: initialState,
  stateHistory: historyInitialState,
  dispatchHistory: () => null,
});

export { HistoryContext, historyReducer, historyInitialState };
