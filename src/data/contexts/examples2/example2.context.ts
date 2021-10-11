import React from 'react';
import {
  Example2InitialProps,
  example2InitialState,
  example2Reducer,
} from '@reducer/examples2/example2.reducer';

const Example2Context = React.createContext<{
  // state: InitialStateType;
  stateExample2: Example2InitialProps;
  dispatchExample2: React.Dispatch<any>;
}>({
  // state: initialState,
  stateExample2: example2InitialState,
  dispatchExample2: () => null,
});

export { Example2Context, example2Reducer, example2InitialState };
