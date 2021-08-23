import React from 'react';
import {
  CoreContext,
  exampleReducer,
  example2Reducer,
  exampleInitialState,
  example2InitialState,
} from './core.context';

const CoreProvider: React.FC = ({ children }) => {
  // const [state, dispatch] = useReducer(mainReducer, initialState);
  const [stateExample, dispatchExample] = React.useReducer(
    exampleReducer,
    exampleInitialState,
  );
  const [stateExample2, dispatchExample2] = React.useReducer(
    example2Reducer,
    example2InitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateExample,
      stateExample2,
      dispatchExample,
      dispatchExample2,
    }),
    [stateExample, stateExample2, dispatchExample, dispatchExample2],
  );
  return (
    <CoreContext.Provider value={valueProvider}>
      {children}
    </CoreContext.Provider>
  );
};

export { CoreProvider, CoreContext };
