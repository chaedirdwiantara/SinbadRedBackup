/** === IMPORT HERE === */
import {
  voucherCartInitialState,
  voucherCartReducer,
  VoucherCartInitialProps,
} from './voucher-cart/voucher-cart.reducer';
import {
  cancelVoucherInitialState,
  cancelVoucherReducer,
  CancelVoucherInitialProps,
} from './voucher-cart/cancel-voucher.reducer';
import {
  CheckSinbadVoucherInitialProps,
  checkSinbadVoucherInitialState,
  checkSinbadVoucherReducer,
} from './check-sinbad-voucher.reducer';
/** === TYPE HERE === */
export type VoucherInitialProps = {
  voucherCart: VoucherCartInitialProps;
  cancelVoucher: CancelVoucherInitialProps;
  checkSinbadVoucher: CheckSinbadVoucherInitialProps;
};
/** === INITIAL HERE === */
export const voucherInitialState = {
  voucherCart: voucherCartInitialState,
  cancelVoucher: cancelVoucherInitialState,
  checkSinbadVoucher: checkSinbadVoucherInitialState,
};
/** === EXPORT ALL HERE === */
export const voucherReducer = (
  { voucherCart, cancelVoucher, checkSinbadVoucher }: any,
  action: any,
) => ({
  voucherCart: voucherCartReducer(voucherCart, action),
  cancelVoucher: cancelVoucherReducer(cancelVoucher, action),
  checkSinbadVoucher: checkSinbadVoucherReducer(checkSinbadVoucher, action),
});
