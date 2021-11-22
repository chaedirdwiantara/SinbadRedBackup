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
    const invoices = [];
    const allSupplier = action.payload.invoices;

    for (let i = 0; i < allSupplier.length; i++) {
      invoices.push({
        ...allSupplier[i],
        ...state.invoices.find(
          (itmInner) =>
            itmInner.invoiceGroupId === allSupplier[i].invoiceGroupId,
        ),
      });
    }

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
    if (state.invoices.length === 0) {
      action.payload.forEach((item) => {
        invoices.push({
          cartParcelId: '',
          invoiceGroupId: item.invoiceGroupId,
          invoiceGroupName: '',
          totalProduct: 0,
          totalPriceBeforeTax: 0,
          PPN: 0,
          isPotentialPromoPayment: false,
          totalPromoSellerAndVoucher: item.totalPromoSellerAndVoucher,
          totalPromoPayment: 0,
          totalPaymentFee: 0,
          totalPayment: 0,
          paymentType: null,
          paymentChannel: null,
          promoSellers: item.promoSellers,
          vouchers: item.vouchers,
          brands: [],
        });
      });
    } else {
      for (let i = 0; i < state.invoices.length; i++) {
        invoices.push({
          ...state.invoices[i],
          ...action.payload.find(
            (itmInner) =>
              itmInner.invoiceGroupId === state.invoices[i].invoiceGroupId,
          ),
        });
      }
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
