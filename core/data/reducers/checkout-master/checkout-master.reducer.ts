/** === IMPORT HERE === */
import * as types from '../../types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === INITIAL STATE HERE === */
const initialState: models.CheckoutDataMaster = {
  cartId: '',
  userId: 1,
  storeId: 1,
  invoices: [],
};

/** === FUNCTION === */
export const checkoutCore = simplifyReducer(initialState, {
  /** => FOR SAVE PAYLOAD CART SELECTED FLAG */
  [types.UPDATE_CHECKOUT_INVOICE_BRAND](
    state = initialState,
    action: models.UpdateCheckoutInvoiceBrand,
  ) {
    return {
      ...state,
      cartId: action.payload.cartId,
      userId: action.payload.userId,
      storeId: action.payload.storeId,
      invoices: action.payload.invoices,
    };
  },
});
