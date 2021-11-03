import { useContext } from 'react';

import { CategoryContext } from './category.context';

export const useCategoryContext = () => {
  const context = useContext(CategoryContext);

  if (context === undefined) {
    throw new Error('useCategoryContext was used outside of CategoryProvider');
  }

  return context;
};
