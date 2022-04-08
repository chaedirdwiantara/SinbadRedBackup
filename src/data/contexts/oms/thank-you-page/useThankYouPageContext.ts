import { useContext } from 'react';

import { ThankYouPageContext } from './thank-you-page.context';

export const useThankYouPageContext = () => {
  const context = useContext(ThankYouPageContext);

  if (context === undefined) {
    throw new Error(
      'useThankYouPageContext was used outside of ThankYouPageProvider',
    );
  }

  return context;
};
