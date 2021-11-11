import { useContext } from 'react';

import { SupplierContext } from './supplier.context';

export const useSupplierContext = () => {
  const context = useContext(SupplierContext);

  if (context === undefined) {
    throw new Error('useSupplierContext was used outside of SupplierProvider');
  }

  return context;
};
