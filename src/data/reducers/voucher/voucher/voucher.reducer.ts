/** === IMPORT HERE === */
import * as models from '@models';
import {
  voucherDetailReducer,
  voucherDetailInitialState,
} from './voucher-detail.reducer';
/** === TYPE HERE === */
export type VoucherInitialProps = models.DetailProps<models.VoucherDetailProps>;
/** === INITIAL HERE === */
export const voucherInitialState = {
  detail: voucherDetailInitialState,
};
/** === EXPORT ALL HERE === */
export const voucherReducer = ({ detail }: any, action: any) => ({
  detail: voucherDetailReducer(detail, action),
});
