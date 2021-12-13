/** === IMPORT HERE === */
import * as models from '@models';
import {
  checkPromoPaymentListReducer,
  checkPromoPaymentListInitialState,
} from './check-promo-payment-list.reducer';
/** === TYPE HERE === */
export type CheckPromoPaymentInitialProps = models.ListProps<
  models.CheckPromoPaymentGetData[]
>;
/** === INITIAL HERE === */
export const checkPromoPaymentInitialState = {
  list: checkPromoPaymentListInitialState,
};
/** === EXPORT ALL HERE === */
export const checkPromoPaymentReducer = ({ list }: any, action: any) => ({
  list: checkPromoPaymentListReducer(list, action),
});
