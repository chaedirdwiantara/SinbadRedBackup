/** === IMPORT HERE === */
import * as models from '@models';
import {
  voucherCartListReducer,
  voucherCartListInitialState,
} from './voucher-cart-list.reducer';
/** === TYPE HERE === */
export type VoucherCartInitialProps =
  models.DetailProps<models.VoucherCartListProps>;
/** === INITIAL HERE === */
export const voucherCartInitialState = {
  detail: voucherCartListInitialState,
};
/** === EXPORT ALL HERE === */
export const voucherCartReducer = ({ list }: any, action: any) => ({
  detail: voucherCartListReducer(list, action),
});
