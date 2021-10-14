import React from 'react';
import {
  GlobalContext,
  globalReducer,
  globalInitialState,
} from './global.context';

const GlobalProvider: React.FC = ({ children }) => {
  const [stateGlobal, dispatchGlobal] = React.useReducer(
    globalReducer,
    globalInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateGlobal,
      dispatchGlobal,
    }),
    [stateGlobal, dispatchGlobal],
  );
  return (
    <GlobalContext.Provider value={valueProvider}>
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalProvider, GlobalContext };
