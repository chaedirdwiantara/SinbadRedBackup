/** === IMPORT HERE === */
import * as models from '@models';
import {
  checkAllPromoPaymentCreateReducer,
  checkAllPromoPaymentCreateInitialState,
} from './check-all-promo-payment-create.reducer';
/** === TYPE HERE === */
export type CheckAllPromoPaymentInitialProps = models.CreateProps;
/** === INITIAL HERE === */
export const reserveDiscountInitialState = {
  create: checkAllPromoPaymentCreateInitialState,
};
/** === EXPORT ALL HERE === */
export const reserveDiscountReducer = ({ create }: any, action: any) => ({
  create: checkAllPromoPaymentCreateReducer(create, action),
});
