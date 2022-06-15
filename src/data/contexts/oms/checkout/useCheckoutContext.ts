import { useContext } from 'react';
import { CheckoutContext } from './checkout.context';

export const useCheckoutContext = () => {
  const context = useContext(CheckoutContext);

  if (context === undefined) {
    throw new Error(
      'useCheckoutContext was used outside of CheckoutProvider',
    );
  }

  return context;
};
