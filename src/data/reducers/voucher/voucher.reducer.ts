/** === IMPORT HERE === */
import * as models from '../../models';
import {
  voucherCartListReducer,
  voucherCartListInitialState,
} from './voucher-cart/voucher-cart-list.reducer';
/** === TYPE HERE === */
export type VoucherInitialProps =
  models.VoucherCartList<models.VoucherCartListProps>;
/** === INITIAL HERE === */
export const voucherInitialState = {
  list: voucherCartListInitialState,
};
/** === EXPORT ALL HERE === */
export const voucherReducer = ({ list }: any, action: any) => ({
  voucherCartList: voucherCartListReducer(list, action),
});
