import * as types from '@types';
import * as models from '@models';
/** => Merge invoice brand */
export const mergeCheckoutInvoiceBrand = (
  payload: models.CheckoutDataMaster,
): models.MergeCheckoutInvoiceBrand => {
  return { type: types.MERGE_CHECKOUT_INVOICE_BRAND, payload };
};
/** =>  Merge discount */
export const mergeReserveDiscountCheckout = (
  payload: models.ReserveDiscount[],
): models.MergeReserveDiscountCheckout => {
  return { type: types.MERGE_RESERVE_DISCOUNT_CHECKOUT, payload };
};
/** => Update Payment type */
export const updatePaymentChannelCheckout = (
  payload: models.PaymentTypeChannel[],
): models.UpdatePaymentChannelCheckout => {
  return { type: types.UPDATE_PAYMENT_CHANNEL_CHECKOUT, payload };
};
/** => Update Total Promo Payment */
export const updatePromoPaymentCheckout = (
  payload: models.PromoPayment[],
): models.UpdatePromoPaymentCheckout => {
  return { type: types.UPDATE_PROMO_PAYMENT_CHECKOUT, payload };
};
