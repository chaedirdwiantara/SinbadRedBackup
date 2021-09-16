import React from 'react';
import {
  OmsInitialProps,
  omsInitialState,
  omsReducer,
} from '@reducer/oms/oms.reducer';

const OmsContext = React.createContext<{
  // state: InitialStateType;
  stateOms: OmsInitialProps;
  dispatchOms: React.Dispatch<any>;
}>({
  // state: initialState,
  stateOms: omsInitialState,
  dispatchOms: () => null,
});

export { OmsContext, omsReducer, omsInitialState };
