import React from 'react';
import {
  GlobalInitialProps,
  globalReducer,
  globalInitialState,
} from '@reducer/global/global-cx.reducer';

const GlobalContext = React.createContext<{
  // state: InitialStateType;
  stateGlobal: GlobalInitialProps;
  dispatchGlobal: React.Dispatch<any>;
}>({
  // state: initialState,
  stateGlobal: globalInitialState,
  dispatchGlobal: () => null,
});

export { GlobalContext, globalReducer, globalInitialState };
