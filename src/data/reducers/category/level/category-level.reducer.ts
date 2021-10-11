/** === IMPORT HERE === */
import * as models from '@models';
import {
  categoryLevelListInitialState,
  categoryLevelListReducer,
} from './category-level-list.reducer';
/** === TYPE HERE === */
export type CategoryLevelInitialProps = models.ListProps<
  models.CategoryLevel[]
>;
/** === INITIAL HERE === */
export const categoryLevelInitialState = {
  list: categoryLevelListInitialState,
};
/** === EXPORT ALL HERE === */
export const categoryLevelReducer = ({ list }: any, action: any) => ({
  list: categoryLevelListReducer(list, action),
});
