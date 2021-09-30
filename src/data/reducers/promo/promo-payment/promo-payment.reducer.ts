/** === IMPORT HERE === */
import * as models from '@models';
import {
  promoPaymentListReducer,
  promoPaymentListInitialState,
} from './promo-payment-list.reducer';
/** === TYPE HERE === */
export type PromoPaymentInitialProps = models.ListProps<
  models.PromoPaymentListSuccessProps[]
>;
/** === INITIAL HERE === */
export const promoPaymentInitialState = {
  list: promoPaymentListInitialState,
};
/** === EXPORT ALL HERE === */
export const promoPaymentReducer = ({ list }: any, action: any) => ({
  list: promoPaymentListReducer(list, action),
});
