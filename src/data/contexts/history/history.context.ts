import { createContext, Dispatch } from 'react';

import {
  HistoryState,
  historyInitialState,
  historyReducer,
} from '@reducer/history/history.reducer';

const HistoryContext = createContext<{
  stateHistory: HistoryState;
  dispatchHistory: Dispatch<any>;
}>({
  stateHistory: historyInitialState,
  dispatchHistory: () => null,
});

export { HistoryContext, historyReducer, historyInitialState };
