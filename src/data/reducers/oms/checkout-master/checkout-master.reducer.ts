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
    action: models.MergeCheckoutInvoiceBrand,
  ) {
    const allSupplier = action.payload.invoices;
    const invoices: models.IInvoiceCheckout[] = allSupplier.map((item) => {
      return {
        cartParcelId: item.cartParcelId,
        invoiceGroupId: item.invoiceGroupId,
        invoiceGroupName: item.invoiceGroupName,
        totalProduct: item.totalProduct,
        totalPriceBeforeTax: item.totalPriceBeforeTax,
        PPN: item.PPN,
        isPotentialPromoPayment: item.isPotentialPromoPayment,
        totalPromoSellerAndVoucher: 0,
        totalPromoPayment: 0,
        totalPaymentFee: 0,
        totalPayment: 0,
        paymentType: null,
        paymentChannel: null,
        promoSellers: [],
        vouchers: [],
        brands: item.brands,
      };
    });

    return {
      ...state,
      cartId: action.payload.cartId,
      invoices: invoices,
    };
  },
  /** => Merge reserve discount checkout */
  [types.MERGE_RESERVE_DISCOUNT_CHECKOUT](
    state = initialState,
    action: models.MergeReserveDiscountCheckout,
  ) {
    let invoices: models.IInvoiceCheckout[] = [];
    for (let i = 0; i < state.invoices.length; i++) {
      invoices.push({
        ...state.invoices[i],
        ...action.payload.find(
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
    action: models.UpdatePaymentChannelCheckout,
  ) {
    let invoices = [];

    for (let i = 0; i < state.invoices.length; i++) {
      invoices.push({
        ...state.invoices[i],
        ...action.payload.find(
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
    action: models.UpdatePromoPaymentCheckout,
  ) {
    let invoices = [];

    for (let i = 0; i < state.invoices.length; i++) {
      invoices.push({
        ...state.invoices[i],
        ...action.payload.find(
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
});
