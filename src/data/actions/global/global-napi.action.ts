import * as types from '@types';
import * as models from '@models';
/** => FOR FCM FLAG */
export const isFCM = (data: boolean) => {
  return { type: types.IS_FCM, payload: data };
};
/** => FOR SAVE SELECTED VOUCHERS DATA */
export const saveSelectedVouchers = (
  data: models.selectedVoucherDataProps | null,
) => {
  return { type: types.SAVE_SELECTED_VOUCHERS, payload: data };
};
