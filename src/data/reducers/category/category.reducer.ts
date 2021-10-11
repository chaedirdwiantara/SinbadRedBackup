/** === IMPORT HERE === */
import {
  categoryHomeInitialState,
  categoryHomeReducer,
  CategoryHomeInitialProps,
} from './home/category-home.reducer';
import {
  categoryLevelInitialState,
  categoryLevelReducer,
  CategoryLevelInitialProps,
} from './level/category-level.reducer';
/** === TYPE HERE === */
export type CategoryInitialProps = {
  home: CategoryHomeInitialProps;
  level: CategoryLevelInitialProps;
};
/** === INITIAL HERE === */
export const categoryInitialState = {
  home: categoryHomeInitialState,
  level: categoryLevelInitialState,
};
/** === EXPORT ALL HERE === */
export const categoryReducer = ({ home, level }: any, action: any) => ({
  home: categoryHomeReducer(home, action),
  level: categoryLevelReducer(level, action),
});
