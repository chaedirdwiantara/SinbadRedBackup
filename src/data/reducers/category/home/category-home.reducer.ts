/** === IMPORT HERE === */
import * as models from '@models';
import {
  categoryHomeListInitialState,
  categoryHomeListReducer,
} from './category-home-list.reducer';
/** === TYPE HERE === */
export type CategoryHomeInitialProps = models.ListProps<models.CategoryHome[]>;
/** === INITIAL HERE === */
export const categoryHomeInitialState = {
  list: categoryHomeListInitialState,
};
/** === EXPORT ALL HERE === */
export const categoryHomeReducer = ({ list }: any, action: any) => ({
  list: categoryHomeListReducer(list, action),
});
