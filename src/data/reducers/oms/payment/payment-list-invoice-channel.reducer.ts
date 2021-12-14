/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PaymentInvoiceChannelListInitialProps =
  models.IListInvoiceChannelProps;
/** === INITIAL STATE HERE === */
export const paymentInvoiceChannelListInitialState: PaymentInvoiceChannelListInitialProps =
  {
    data: [],
  };
/** === FUNCTION HERE === */
export const paymentInvoiceChannelListReducer = simplifyReducer(
  paymentInvoiceChannelListInitialState,
  {
    /** ===> DETAIL */
    /** => success */
    [types.PAYMENT_LIST_INVOICE_CHANNEL_PROCESS](
      state = paymentInvoiceChannelListInitialState,

      { payload }: models.IListInvoiceChannelSuccess,
    ) {
      const idInvoice = payload.id;
      let newData = state.data;
      if (!state.data.some((item) => item === idInvoice)) {
        newData.push(idInvoice);
      }
      return {
        ...state,
        data: newData,
        loading: false,
      };
    },

    /** => reset */
    [types.PAYMENT_LIST_INVOICE_CHANNEL_RESET]() {
      console.log('reset reducer');

      return {
        data: [],
      };
    },
  },
);
