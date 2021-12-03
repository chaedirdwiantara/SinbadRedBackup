/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.IPaymentChannelsModal = {
  invoiceGroupId: null,
  paymentType: null,
  totalCartParcel: 0,
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
  [types.UPDATE_INVOICE_GROUP_ID](
    state = initialState,
    { payload }: models.IUpdateInvoiceChannel,
  ) {
    const invoiceGroupId = payload;
    return {
      ...state,
      invoiceGroupId,
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
  /** => Update payment channel checkout */
  [types.UPDATE_PROMO_PAYMENT_CHANNEL](
    state = initialState,
    { payload }: models.IUpdatePromoPaymentChannel,
  ) {
    let newPaymentChannels = [];
    for (let i = 0; i < state.paymentChannels.length; i++) {
      let newTypes = [];
      for (let y = 0; y < state.paymentChannels[i].type.length; y++) {
        newTypes.push({
          ...state.paymentChannels[i].type[y],
          ...payload.find(
            (itmInner) =>
              itmInner.paymentChannelId === state.paymentChannels[i].type[y].id,
          ),
        });
      }
      newPaymentChannels.push({
        ...state.paymentChannels[i],
        type: newTypes,
      });
    }
    return {
      ...state,
      paymentChannels: newPaymentChannels,
    };
  },
  [types.UPDATE_TOTAL_CART_PARCEL](
    state = initialState,
    { payload }: models.IUpdateTotalCartParcel,
  ) {
    const totalCartParcel = payload;
    return {
      ...state,
      totalCartParcel,
    };
  },
  [types.RESET_PAYMENT_MODAL_MASTER_DATA]() {
    return initialState;
  },
});
