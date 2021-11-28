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
  [types.UPDATE_PAYMENT_CHANNELS](
    state = initialState,
    { payload }: models.IUpdatePaymentChannel,
  ) {
    const paymentChannels: models.IPaymentChannels[] = payload?.map((item) => {
      return {
        id: item.id,
        name: item.name,
        type: item.type.map((detail) => {
          return {
            id: detail.id,
            name: detail.name,
            image: detail.image,
            totalFee: detail.totalFee,
            status: detail.status,
            message: detail.message,
            totalPayment: detail.totalPayment,
            promoPaymentAvailable: null,
            promPaymentDescription: null,
            promoPaymentAmount: null,
          };
        }),
      };
    });
    return {
      ...state,
      paymentChannels,
    };
  },
});
