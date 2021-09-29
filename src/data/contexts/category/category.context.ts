import React from 'react';
import {
  CategoryInitialProps,
  categoryInitialState,
  categoryReducer,
} from '@reducer/category/category.reducer';

const CategoryContext = React.createContext<{
  // state: InitialStateType;
  stateCategory: CategoryInitialProps;
  dispatchCategory: React.Dispatch<any>;
}>({
  // state: initialState,
  stateCategory: categoryInitialState,
  dispatchCategory: () => null,
});

export { CategoryContext, categoryReducer, categoryInitialState };
