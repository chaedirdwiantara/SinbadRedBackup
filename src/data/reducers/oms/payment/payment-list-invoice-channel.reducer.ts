/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PaymentListInvoiceChannelInitialProps = models.DetailItemProps<{}>;
/** === INITIAL STATE HERE === */
export const paymentListInvoiceChannelInitialState: PaymentListInvoiceChannelInitialProps =
  {
    data: {},
  };
/** === FUNCTION HERE === */
export const paymentListInvoiceChannelReducer = simplifyReducer(
  paymentListInvoiceChannelInitialState,
  {
    /** ===> DETAIL */
    /** => process */
    // [types.PAYMENT_LIST_INVOICE_CHANNEL_PROCESS]() {
    //   console.log('ACTION');

    //   return {
    //     ...paymentListInvoiceChannelInitialState,
    //     loading: true,
    //   };
    // },
    /** => success */
    [types.PAYMENT_LIST_INVOICE_CHANNEL_PROCESS](
      state = paymentListInvoiceChannelInitialState,
      {
        payload,
      }: models.DetailSuccessAction<models.IListInvoiceChannelSuccess>,
    ) {
      console.log(payload, 'PAYLOAD REDUCER');

      return {
        ...state,
        data: payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.PAYMENT_LIST_INVOICE_CHANNEL_FAILED](
      state = paymentListInvoiceChannelInitialState,
      { payload }: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },

    /** => reset */
    [types.PAYMENT_LIST_INVOICE_CHANNEL_RESET]() {
      return paymentListInvoiceChannelInitialState;
    },
  },
);
