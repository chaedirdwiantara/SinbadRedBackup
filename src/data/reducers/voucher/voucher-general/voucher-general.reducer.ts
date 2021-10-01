/** === IMPORT HERE === */
import * as models from '@models';
import {
  voucherDetailReducer,
  voucherDetailInitialState,
} from './voucher-general-detail.reducer';
/** === TYPE HERE === */
export type VoucherGeneralInitialProps =
  models.DetailProps<models.VoucherDetailProps>;
/** === INITIAL HERE === */
export const voucherGeneralInitialState = {
  detail: voucherDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const voucherGeneralReducer = ({ detail }: any, action: any) => ({
  detail: voucherDetailReducer(detail, action),
});
