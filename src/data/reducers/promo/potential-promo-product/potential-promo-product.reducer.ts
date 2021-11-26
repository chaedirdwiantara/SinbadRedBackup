/** === IMPORT HERE === */
import * as models from '@models';
import {
  potentialPromoProductDetailInitialState,
  potentialPromoProductDetailReducer,
} from './potential-promo-product-detail.reducer';
/** === TYPE HERE === */
export type PotentialPromoProductInitialProps =
  models.DetailProps<models.PotentialPromoProductProps>;
/** === INITIAL HERE === */
export const potentialPromoProductInitialState = {
  detail: potentialPromoProductDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const potentialPromoProductReducer = ({ detail }: any, action: any) => ({
  detail: potentialPromoProductDetailReducer(detail, action),
});
