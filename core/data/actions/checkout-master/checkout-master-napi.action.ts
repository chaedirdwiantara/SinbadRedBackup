import * as types from '@types';
import * as models from '@models';
/** => For Update Checkout Invoice Brand */
export const updateCheckoutInvoiceBrand = (
  data: models.CheckoutDataMaster,
): models.UpdateCheckoutInvoiceBrand => {
  return { type: types.UPDATE_CHECKOUT_INVOICE_BRAND, payload: data };
};
