import React from 'react';
import {
  ExampleContext,
  exampleInitialState,
  exampleReducer,
} from './example.context';

const ExampleProvider: React.FC = ({ children }) => {
  const [stateExample, dispatchExample] = React.useReducer(
    exampleReducer,
    exampleInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateExample,
      dispatchExample,
    }),
    [stateExample, dispatchExample],
  );
  return (
    <ExampleContext.Provider value={valueProvider}>
      {children}
    </ExampleContext.Provider>
  );
};

export { ExampleProvider, ExampleContext };
