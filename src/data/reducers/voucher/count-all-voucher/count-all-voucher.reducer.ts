/** === IMPORT HERE === */
import * as models from '@models';
import {
  countAllVoucherReducer,
  countAllVoucherInitialState,
} from './count-all-voucher-detail.reducer';
/** === TYPE HERE === */
export type CountVoucherInitialProps =
  models.DetailProps<models.CountAllVoucherProps>;
/** === INITIAL HERE === */
export const countVoucherInitialState = {
  detail: countAllVoucherInitialState,
};
/** === EXPORT ALL HERE === */
export const countVoucherReducer = ({ detail }: any, action: any) => ({
  detail: countAllVoucherReducer(detail, action),
});
