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
  countVoucherInitialState,
  countVoucherReducer,
  CountVoucherInitialProps,
} from './count-all-voucher/count-all-voucher.reducer';
import {
  cancelVoucherInitialState,
  cancelVoucherReducer,
  CancelVoucherInitialProps,
} from './voucher-cart/cancel-voucher.reducer';
/** === TYPE HERE === */
export type VoucherInitialProps = {
  voucherCart: VoucherCartInitialProps;
  voucherGeneral: VoucherGeneralInitialProps;
  countVoucher: CountVoucherInitialProps;
  cancelVoucher: CancelVoucherInitialProps;
};
/** === INITIAL HERE === */
export const voucherInitialState = {
  voucherCart: voucherCartInitialState,
  voucherGeneral: voucherGeneralInitialState,
  countVoucher: countVoucherInitialState,
  cancelVoucher: cancelVoucherInitialState,
};
/** === EXPORT ALL HERE === */
export const voucherReducer = (
  { voucherCart, voucherGeneral, countVoucher, cancelVoucher }: any,
  action: any,
) => ({
  voucherCart: voucherCartReducer(voucherCart, action),
  voucherGeneral: voucherGeneralReducer(voucherGeneral, action),
  countVoucher: countVoucherReducer(countVoucher, action),
  cancelVoucher: cancelVoucherReducer(cancelVoucher, action),
});
