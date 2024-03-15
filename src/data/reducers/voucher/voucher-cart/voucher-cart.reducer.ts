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
import {
  updateVisibilityVoucherReducer,
  updateVisibilityVoucherInitialState,
  UpdateVisibilityVoucherInitialProps,
} from './update-visibility-voucher.reducer';

export interface VoucherCartInitialProps {
  list: VoucherCartListInitialProps;
  detail: VoucherCartDetailInitialProps;
  updateVisibility: UpdateVisibilityVoucherInitialProps;
}
/** === INITIAL HERE === */
export const voucherCartInitialState = {
  list: voucherCartListInitialState,
  detail: voucherCartDetailInitialState,
  updateVisibility: updateVisibilityVoucherInitialState,
};
/** === EXPORT ALL HERE === */
export const voucherCartReducer = (
  { list, detail, updateVisibility }: any,
  action: any,
) => ({
  list: voucherCartListReducer(list, action),
  detail: voucherCartDetailReducer(detail, action),
  updateVisibility: updateVisibilityVoucherReducer(updateVisibility, action),
});
