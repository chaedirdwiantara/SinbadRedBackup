/** === IMPORT HERE === */
import * as models from '@models';
import {
  promoPaymentListReducer,
  promoPaymentListInitialState,
} from './promo-payment-list.reducer';
import {
  promoPaymentDetailReducer,
  promoPaymentDetailInitialState,
} from './promo-payment-detail.reducer';
/** === TYPE HERE === */
export type PromoPaymentInitialProps = models.ListProps<
  models.PromoPaymentListSuccessProps[]
> &
  models.DetailProps<models.PromoPaymentDetailSuccessProps>;
/** === INITIAL HERE === */
export const promoPaymentInitialState = {
  list: promoPaymentListInitialState,
  detail: promoPaymentDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const promoPaymentReducer = ({ list, detail }: any, action: any) => ({
  list: promoPaymentListReducer(list, action),
  detail: promoPaymentDetailReducer(detail, action),
});
