/** === IMPORT HERE === */
import {
  voucherCartInitialState,
  voucherCartReducer,
  VoucherCartInitialProps,
} from './voucher-cart/voucher-cart.reducer';
import {
  voucherGeneralInitialState,
  voucherGeneralReducer,
  VoucherGeneralInitialProps,
} from './voucher-general/voucher-general.reducer';
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
  voucherGeneral: VoucherGeneralInitialProps;
  cancelVoucher: CancelVoucherInitialProps;
  checkSinbadVoucher: CheckSinbadVoucherInitialProps;
};
/** === INITIAL HERE === */
export const voucherInitialState = {
  voucherCart: voucherCartInitialState,
  voucherGeneral: voucherGeneralInitialState,
  cancelVoucher: cancelVoucherInitialState,
  checkSinbadVoucher: checkSinbadVoucherInitialState,
};
/** === EXPORT ALL HERE === */
export const voucherReducer = (
  { voucherCart, voucherGeneral, cancelVoucher, checkSinbadVoucher }: any,
  action: any,
) => ({
  voucherCart: voucherCartReducer(voucherCart, action),
  voucherGeneral: voucherGeneralReducer(voucherGeneral, action),
  cancelVoucher: cancelVoucherReducer(cancelVoucher, action),
  checkSinbadVoucher: checkSinbadVoucherReducer(checkSinbadVoucher, action),
});
