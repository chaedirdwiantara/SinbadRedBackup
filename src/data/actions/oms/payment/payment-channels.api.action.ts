import * as types from '@types';
import * as models from '@models';

/** merge data payment channels */
export const mergePaymentChannels = (
  payload: models.IPaymentChannelsModal,
): models.IMergePaymentChannels => {
  return { type: types.MERGE_PAYMENT_CHANNELS, payload };
};

/** update selected payment  */
export const selectedPaymentType = (
  payload: models.ISelectedPaymentType,
): models.IUpdatePaymentType => {
  return { type: types.SELECTED_PAYMENT_TYPE, payload };
};
