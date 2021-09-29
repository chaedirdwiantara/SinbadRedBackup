/** === IMPORT HERE === */
import * as models from '../../models';
import {
  promoPaymentListReducer,
  promoPaymentListInitialState,
} from './promo-payment-list.reducer';
/** === TYPE HERE === */
export type PromoInitialProps = {
  promoPaymentList: models.ListItemProps<models.Example[]>;
};
/** === INITIAL HERE === */
export const promoInitialState = {
  promoPaymentList: promoPaymentListInitialState,
};
/** === EXPORT ALL HERE === */
export const promoReducer = ({ list }: any, action: any) => ({
  promoPaymentList: promoPaymentListReducer(list, action),
});
