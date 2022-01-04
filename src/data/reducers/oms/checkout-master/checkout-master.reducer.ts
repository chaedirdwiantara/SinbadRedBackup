/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.CheckoutDataMaster = {
  cartId: null,
  invoices: [],
};

/** === FUNCTION === */
export const checkout = simplifyReducer(initialState, {
  /** => Save Merge Invoice Brand */
  [types.MERGE_CHECKOUT_INVOICE_BRAND](
    state = initialState,
    { payload }: models.MergeCheckoutInvoiceBrand,
  ) {
    const allSupplier = payload.invoices;
    const invoices: models.IInvoiceCheckout[] = allSupplier.map((item) => {
      return {
        invoiceGroupId: item.invoiceGroupId,
        invoiceGroupName: item.invoiceGroupName,
        totalProduct: item.totalProduct,
        totalPriceBeforeTax: item.totalPriceBeforeTax,
        totalPriceAfterTax: item.totalPriceAfterTax,
        tax: item.tax,
        isPotentialPaymentPromo: item.isPotentialPaymentPromo,
        totalPromoSellerAndVoucher: 0,
        totalPromoPayment: 0,
        totalFee: 0,
        totalPayment: 0,
        paymentType: null,
        paymentChannel: null,
        promoSellers: [],
        voucherSeller: null,
        brands: item.brands,
        sellerId: item.sellerId,
        channelId: item.channelId,
        groupId: item.groupId,
        typeId: item.typeId,
        clusterId: item.clusterId,
      };
    });

    return {
      ...state,
      cartId: payload.cartId,
      invoices: invoices,
    };
  },
  /** => Merge reserve discount checkout */
  [types.MERGE_RESERVE_DISCOUNT_CHECKOUT](
    state = initialState,
    { payload }: models.MergeReserveDiscountCheckout,
  ) {
    let invoices: models.IInvoiceCheckout[] = [];
    for (let i = 0; i < state.invoices.length; i++) {
      invoices.push({
        ...state.invoices[i],
        ...payload.find(
          (itmInner) =>
            itmInner.invoiceGroupId === state.invoices[i].invoiceGroupId,
        ),
      });
    }

    return {
      ...state,
      invoices: invoices,
    };
  },
  /** => Update payment channel checkout */
  [types.UPDATE_PAYMENT_CHANNEL_CHECKOUT](
    state = initialState,
    { payload }: models.UpdatePaymentChannelCheckout,
  ) {
    let invoices = [];
    for (let i = 0; i < state.invoices.length; i++) {
      invoices.push({
        ...state.invoices[i],
        ...payload.find(
          (itmInner) =>
            itmInner.invoiceGroupId === state.invoices[i].invoiceGroupId,
        ),
      });
    }

    return {
      ...state,
      invoices: invoices,
    };
  },
  /** => Update payment channel checkout */
  [types.UPDATE_PROMO_PAYMENT_CHECKOUT](
    state = initialState,
    { payload }: models.UpdatePromoPaymentCheckout,
  ) {
    let invoices = [];

    for (let i = 0; i < state.invoices.length; i++) {
      invoices.push({
        ...state.invoices[i],
        ...payload.find(
          (itmInner) =>
            itmInner.invoiceGroupId === state.invoices[i].invoiceGroupId,
        ),
      });
    }

    return {
      ...state,
      invoices: invoices,
    };
  },
  /** => Update Cart id checkout */
  [types.UPDATE_CART_ID_CHECKOUT](
    state = initialState,
    { payload }: models.UpdateCartIdCheckout,
  ) {
    return {
      ...state,
      cartId: payload.cartId,
    };
  },
  /** => Reset Invoices */
  [types.RESET_CHECKOUT_MASTER_DATA](state = initialState) {
    return {
      ...state,
      invoices: [],
    };
  },
});
