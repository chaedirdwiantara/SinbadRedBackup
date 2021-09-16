/** === IMPORT HERE === */
import * as models from '../../models';
import {
  voucherCartListReducer,
  voucherCartListInitialState,
} from './voucher-cart-list.reducer';
/** === TYPE HERE === */
export type VoucherInitialProps = models.DetailProps<models.VoucherCartList>;
/** === INITIAL HERE === */
export const voucherInitialState = {
  detail: voucherCartListInitialState,
};
/** === EXPORT ALL HERE === */
export const voucherReducer = ({ detail }: any, action: any) => ({
  detail: voucherCartListReducer(detail, action),
});
