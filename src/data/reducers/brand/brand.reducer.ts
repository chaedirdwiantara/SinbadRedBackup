/** === IMPORT HERE === */
import * as models from '@models';
import { brandlistInitialState, brandListReducer } from './brand-list.reducer';
/** === TYPE HERE === */
export type BrandInitialProps = models.ListProps<
  models.BrandListSuccessProps[]
>;
/** === INITIAL HERE === */
export const brandInitialState = {
  list: brandlistInitialState,
};
/** === EXPORT ALL HERE === */
export const brandReducer = ({ list }: any, action: any) => ({
  list: brandListReducer(list, action),
});
