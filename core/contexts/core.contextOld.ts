import React from 'react';
import {
  ExampleInitialProps,
  exampleInitialState,
  exampleReducer,
} from '@reducer/examples/example.reducer';
import {
  Example2InitialProps,
  example2InitialState,
  example2Reducer,
} from '@reducer/examples2/example2.reducer';

/** do not remove these code */
// type InitialStateType = {
//   example: ExampleInitialProps;
//   example2: Example2InitialProps;
// };

// const initialState = {
//   example: exampleInitialState,
//   example2: example2InitialState,
// };

// const mainReducer = ({ example, example2 }: any, action: any) => ({
//   example: exampleReducer(example, action),
//   example2: example2Reducer(example2, action),
// });

// const CoreContext = createContext<{
//   state: InitialStateType;
//   dispatch: Dispatch<any>;
// }>({
//   state: initialState,
//   dispatch: () => null,
// });
/** ==================================== */

const CoreContext = React.createContext<{
  // state: InitialStateType;
  stateExample: ExampleInitialProps;
  stateExample2: Example2InitialProps;
  dispatchExample: React.Dispatch<any>;
  dispatchExample2: React.Dispatch<any>;
}>({
  // state: initialState,
  stateExample: exampleInitialState,
  stateExample2: example2InitialState,
  dispatchExample: () => null,
  dispatchExample2: () => null,
});

export {
  CoreContext,
  exampleReducer,
  example2Reducer,
  exampleInitialState,
  example2InitialState,
};
