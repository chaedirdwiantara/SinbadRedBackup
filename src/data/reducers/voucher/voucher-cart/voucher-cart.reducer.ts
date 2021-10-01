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
export const voucherCartReducer = ({ detail }: any, action: any) => ({
  detail: voucherCartListReducer(detail, action),
});
