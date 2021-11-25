/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PaymentLastChannelDetailInitialProps = models.DetailItemProps<{}>;

/** === INITIAL STATE HERE === */
export const paymentLastChannelDetailInitialState: PaymentLastChannelDetailInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const paymentLastChannelDetailReducer = simplifyReducer(
  paymentLastChannelDetailInitialState,
  {
    /** ===> DETAIL */
    /** => process */
    [types.PAYMENT_LAST_CHANNEL_DETAIL_PROCESS]() {
      return {
        ...paymentLastChannelDetailInitialState,
        loading: true,
      };
    },
    /** => success */
    [types.PAYMENT_LAST_CHANNEL_DETAIL_SUCCESS](
      state = paymentLastChannelDetailInitialState,
      {
        payload,
      }: models.DetailSuccessAction<models.IPaymentLastChannelDetailProps>,
    ) {
      return {
        ...state,
        data: payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.PAYMENT_LAST_CHANNEL_DETAIL_FAILED](
      state = paymentLastChannelDetailInitialState,
      { payload }: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },

    /** => reset */
    [types.PAYMENT_LAST_CHANNEL_DETAIL_RESET]() {
      return paymentLastChannelDetailInitialState;
    },
  },
);
