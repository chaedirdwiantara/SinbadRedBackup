import { useContext } from 'react';
import { PaymentMethodContext } from './paymentMethod.context';

export const usePaymentMethodContext = () => {
  const context = useContext(PaymentMethodContext);

  if (context === undefined) {
    throw new Error(
      'usePaymentMethodContext was used outside of PaymentMethodProvider',
    );
  }

  return context;
};
