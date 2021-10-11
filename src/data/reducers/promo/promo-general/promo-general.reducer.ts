/** === IMPORT HERE === */
import * as models from '@models';
import {
  promoGeneralDetailReducer,
  promoGeneralDetailInitialState,
} from './promo-general-detail.reducer';
/** === TYPE HERE === */
export type PromoGeneralInitialProps =
  models.DetailProps<models.PromoGeneralDetailSuccessProps>;
/** === INITIAL HERE === */
export const promoGeneralInitialState = {
  detail: promoGeneralDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const promoGeneralReducer = ({ detail }: any, action: any) => ({
  detail: promoGeneralDetailReducer(detail, action),
});
