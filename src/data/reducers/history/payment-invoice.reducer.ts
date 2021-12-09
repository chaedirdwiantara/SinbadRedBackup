/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import { PaymentInvoiceSuccessProps } from '@models';
import * as types from '@types';
/** === TYPE === */
export type PaymentInvoiceInitialProps =
  models.DetailItemProps<models.PaymentInvoiceSuccessProps>;
/** === INITIAL STATE === */
export const paymentInvoiceInitialState: PaymentInvoiceInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const paymentInvoiceReducer = simplifyReducer(
  paymentInvoiceInitialState,
  {
    /** Process */
    [types.HISTORY_INVOICE_DETAIL_PROCESS]() {
      return {
        ...paymentInvoiceInitialState,
        loading: true,
      };
    },
    /** Success */
    [types.HISTORY_INVOICE_DETAIL_SUCCESS](
      state = paymentInvoiceInitialState,
      action: models.DetailSuccessAction<models.PaymentInvoiceSuccessProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** Failed */
    [types.HISTORY_INVOICE_DETAIL_FAILED](
      state = paymentInvoiceInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },
  },
);
