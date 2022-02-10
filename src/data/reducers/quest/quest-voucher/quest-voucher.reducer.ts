/** === IMPORT HERE === */
import * as models from '@models';
import {
  questVoucherValidateInitialState,
  questVoucherValidateReducer,
} from './quest-voucher-validate.reducer';
import {
  questTaskSubmitVoucherInitialState,
  questTaskSubmitVoucherReducer,
} from './quest-voucher-submit.reducer';
/** === TYPE HERE */
export type QuestVoucherInitialProps =
  models.ValidateVoucherProps<models.QuestValidateVoucherItem> &
    models.submitVoucherProps;
/** === INITIAL HERE === */
export const questVoucherInitialState = {
  validate: questVoucherValidateInitialState,
  submit: questTaskSubmitVoucherInitialState,
};
/** === EXPORT ALL HERE === */
export const questVoucherReducer = (
  { validate, submit }: any,
  action: any,
) => ({
  validate: questVoucherValidateReducer(validate, action),
  submit: questTaskSubmitVoucherReducer(submit, action),
});
