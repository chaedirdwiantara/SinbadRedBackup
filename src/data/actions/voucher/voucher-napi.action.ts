import * as types from '@types';
import * as models from '@models';
/** => save selected voucher */
export const saveSelectedVoucher = (
  data: models.SaveSelectedVoucher,
): models.SaveSelectedVoucherAction => {
  return {
    type: types.SAVE_SELECTED_VOUCHER,
    payload: data,
  };
};
/** => reset selected voucher */
export const resetSelectedVoucher = (): models.ResetSelectedVoucherAction => {
  return {
    type: types.RESET_SELECTED_VOUCHER,
  };
};
