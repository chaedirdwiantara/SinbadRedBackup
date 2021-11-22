import * as models from '@models';
/** => merge invoice */
export interface MergeCheckoutInvoiceBrand {
  type: string;
  payload: models.CheckoutDataMaster;
}
/** => merge discount */
export interface MergeReserveDiscountCheckout {
  type: string;
  payload: models.ReserveDiscount[];
}
/** => update payment type */
export interface UpdatePaymentChannelCheckout {
  type: string;
  payload: models.PaymentTypeChannel[];
}
/** => update total promo payment */
export interface UpdatePromoPaymentCheckout {
  type: string;
  payload: models.PromoPayment[];
}
