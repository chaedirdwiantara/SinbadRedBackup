import React from 'react';
import {
  categoryInitialState,
  categoryReducer,
  CategoryContext,
} from './category.context';

const CategoryProvider: React.FC = ({ children }) => {
  const [stateCategory, dispatchCategory] = React.useReducer(
    categoryReducer,
    categoryInitialState,
  );
  const valueProvider = React.useMemo(
    () => ({
      stateCategory,
      dispatchCategory,
    }),
    [stateCategory, dispatchCategory],
  );
  return (
    <CategoryContext.Provider value={valueProvider}>
      {children}
    </CategoryContext.Provider>
  );
};

export { CategoryProvider, CategoryContext };
