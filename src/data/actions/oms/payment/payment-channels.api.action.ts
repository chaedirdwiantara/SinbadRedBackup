import * as types from '@types';
import * as models from '@models';

/** update selected payment  */
export const selectedPaymentType = (
  payload: models.ISelectedPaymentType,
): models.IUpdatePaymentType => {
  return { type: types.SELECTED_PAYMENT_TYPE, payload };
};

/** update selected channel */
export const listPaymentChannel = (
  payload: models.IPaymentChannels[],
): models.IUpdatePaymentChannel => {
  return { type: types.UPDATE_PAYMENT_CHANNELS, payload };
};
