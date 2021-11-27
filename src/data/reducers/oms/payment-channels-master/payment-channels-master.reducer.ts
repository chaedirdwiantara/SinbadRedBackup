/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.IPaymentChannelsModal = {
  invoiceGroupId: null,
  paymentType: null,
  paymentChannels: [],
};

/** === FUNCTION === */
export const paymentChannelsModal = simplifyReducer(initialState, {
  /** => save data payment channels */
  [types.MERGE_PAYMENT_CHANNELS](
    state = initialState,
    { payload }: models.IMergePaymentChannels,
  ) {
    const paymentType = payload.paymentType;
    const dataPaymentChannels = payload.paymentChannels;
    const paymentChannels: models.IPaymentChannels[] = dataPaymentChannels?.map(
      (item) => {
        return {
          id: item.id,
          name: item.name,
          image: item.image,
          totalFee: item.totalFee,
          status: item.status,
          message: item.message,
          totalPayment: item.totalPayment,
          promoPaymentAmount: null,
          promPaymentDescription: null,
          promoPaymentAvailable: null,
        };
      },
    );
    return {
      ...state,
      invoiceGroupId: payload.invoiceGroupId,
      paymentType,
      paymentChannels,
    };
  },
  [types.SELECTED_PAYMENT_TYPE](
    state = initialState,
    { payload }: models.IUpdatePaymentType,
  ) {
    const paymentType = {
      id: payload.id,
      name: payload.name,
      iconUrl: payload.iconUrl,
    };
    return {
      ...state,
      paymentType,
    };
  },
});
