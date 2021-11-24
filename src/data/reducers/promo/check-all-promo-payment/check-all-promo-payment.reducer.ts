/** === IMPORT HERE === */
import * as models from '@models';
import {
  checkAllPromoPaymentCreateReducer,
  checkAllPromoPaymentCreateInitialState,
} from './check-all-promo-payment-create.reducer';
import {
  checkAllPromoPaymentListReducer,
  checkAllPromoPaymentListInitialState,
} from './check-all-promo-payment-list.reducer';
/** === TYPE HERE === */
export type CheckAllPromoPaymentInitialProps = models.CreateProps &
  models.ListProps<models.CheckAllPromoPaymentGetData[]>;
/** === INITIAL HERE === */
export const checkAllPromoPaymentInitialState = {
  create: checkAllPromoPaymentCreateInitialState,
  list: checkAllPromoPaymentListInitialState,
};
/** === EXPORT ALL HERE === */
export const checkAllPromoPaymentReducer = (
  { create, list }: any,
  action: any,
) => ({
  create: checkAllPromoPaymentCreateReducer(create, action),
  list: checkAllPromoPaymentListReducer(list, action),
});
