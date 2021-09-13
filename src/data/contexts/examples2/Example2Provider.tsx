import React from 'react';
import {
  Example2Context,
  example2InitialState,
  example2Reducer,
} from './example2.context';

const Example2Provider: React.FC = ({ children }) => {
  const [stateExample2, dispatchExample2] = React.useReducer(
    example2Reducer,
    example2InitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateExample2,
      dispatchExample2,
    }),
    [stateExample2, dispatchExample2],
  );
  return (
    <Example2Context.Provider value={valueProvider}>
      {children}
    </Example2Context.Provider>
  );
};

export { Example2Provider, Example2Context };
