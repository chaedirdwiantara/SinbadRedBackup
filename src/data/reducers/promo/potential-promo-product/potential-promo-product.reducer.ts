/** === IMPORT HERE === */
import * as models from '@models';
import {
  potentialPromoProductListInitialState,
  potentialPromoProductListReducer,
} from './potential-promo-product-list.reducer';
/** === TYPE HERE === */
export type PotentialPromoProductInitialProps =
  models.ListProps<models.PotentialPromoProductProps>;
/** === INITIAL HERE === */
export const potentialPromoProductInitialState = {
  list: potentialPromoProductListInitialState,
};
/** === EXPORT ALL HERE === */
export const potentialPromoProductReducer = ({ list }: any, action: any) => ({
  list: potentialPromoProductListReducer(list, action),
});
