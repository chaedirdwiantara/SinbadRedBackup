import React from 'react';
import {
  ThankYouPageState,
  thankYouPageInitialState,
  thankYouPageReducer
} from '@reducer/oms/thank-you-page/thank-you-page.reducer';

const ThankYouPageContext = React.createContext<{
  // state: InitialStateType;
  stateThankYouPage: ThankYouPageState;
  dispatchThankYouPage: React.Dispatch<any>;
}>({
  // state: initialState,
  stateThankYouPage: thankYouPageInitialState,
  dispatchThankYouPage: () => null,
});

export {
  ThankYouPageContext,
  thankYouPageReducer,
  thankYouPageInitialState,
};