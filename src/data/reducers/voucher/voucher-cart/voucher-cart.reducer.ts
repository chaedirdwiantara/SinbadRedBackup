/** === IMPORT HERE === */
import {
  VoucherCartDetailInitialProps,
  voucherCartDetailInitialState,
  voucherCartDetailReducer,
} from './voucher-cart-detail.reducer';
import {
  voucherCartListReducer,
  voucherCartListInitialState,
  VoucherCartListInitialProps,
} from './voucher-cart-list.reducer';

export interface VoucherCartInitialProps {
  list: VoucherCartListInitialProps;
  detail: VoucherCartDetailInitialProps;
}
/** === INITIAL HERE === */
export const voucherCartInitialState = {
  list: voucherCartListInitialState,
  detail: voucherCartDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const voucherCartReducer = ({ list, detail }: any, action: any) => ({
  list: voucherCartListReducer(list, action),
  detail: voucherCartDetailReducer(detail, action),
});
