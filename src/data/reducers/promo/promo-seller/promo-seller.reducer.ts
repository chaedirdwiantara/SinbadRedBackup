/** === IMPORT HERE === */
import * as models from '@models';
import {
  promoSellerDetailInitialState,
  promoSellerDetailReducer,
} from './promo-seller-detail.reducer';
/** === TYPE HERE === */
export type PromoSellerInitialProps =
  models.DetailProps<models.PromoSellerDetailSuccessProps>;
/** === INITIAL HERE === */
export const promoSellerInitialState = {
  detail: promoSellerDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const promoSellerReducer = ({ detail }: any, action: any) => ({
  detail: promoSellerDetailReducer(detail, action),
});
