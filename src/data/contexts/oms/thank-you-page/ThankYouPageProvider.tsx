import React from 'react';
import {
  ThankYouPageContext,
  thankYouPageReducer,
  thankYouPageInitialState,
} from './thank-you-page.context';

const ThankYouPageProvider: React.FC = ({ children }) => {
  const [stateThankYouPage, dispatchThankYouPage] = React.useReducer(
    thankYouPageReducer,
    thankYouPageInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateThankYouPage,
      dispatchThankYouPage,
    }),
    [stateThankYouPage, dispatchThankYouPage],
  );
  return (
    <ThankYouPageContext.Provider value={valueProvider}>
      {children}
    </ThankYouPageContext.Provider>
  );
};

export { ThankYouPageProvider, ThankYouPageContext };