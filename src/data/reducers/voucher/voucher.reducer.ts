/** === IMPORT HERE === */
import * as models from '../../models';
import {
  voucherCartListReducer,
  voucherCartListInitialState,
} from './voucher-cart-list.reducer';
/** === TYPE HERE === */
export type VoucherInitialProps = models.ListProps<models.VoucherCartList[]>;
/** === INITIAL HERE === */
export const voucherInitialState = {
  list: voucherCartListInitialState,
};
/** === EXPORT ALL HERE === */
export const voucherReducer = ({ list }: any, action: any) => ({
  list: voucherCartListReducer(list, action),
});
