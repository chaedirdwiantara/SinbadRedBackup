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
/** === TYPE HERE === */
export type VoucherInitialProps = {
  voucherCart: VoucherCartInitialProps;
  voucherGeneral: VoucherGeneralInitialProps;
};
/** === INITIAL HERE === */
export const voucherInitialState = {
  voucherCart: voucherCartInitialState,
  voucherGeneral: voucherGeneralInitialState,
};
/** === EXPORT ALL HERE === */
export const voucherReducer = (
  { voucherCart, voucherGeneral }: any,
  action: any,
) => ({
  voucherCart: voucherCartReducer(voucherCart, action),
  voucherGeneral: voucherGeneralReducer(voucherGeneral, action),
});
