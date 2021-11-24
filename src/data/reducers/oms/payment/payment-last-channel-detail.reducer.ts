/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
<<<<<<< HEAD
export type PaymentLastChannelDetailInitialProps = models.DetailItemProps<{}>;
=======
type PaymentLastChannelDetailInitialProps = models.DetailItemProps<{}>;
>>>>>>> 213db15 (checkout - integrate tnc)
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
<<<<<<< HEAD
      {
        payload,
      }: models.DetailSuccessAction<models.IPaymentLastChannelDetailProps>,
    ) {
      return {
        ...state,
        data: payload.data,
=======
      action: models.DetailSuccessAction<models.IPaymentLastChannelDetailProps>,
    ) {
      return {
        ...state,
        data: action.payload.data,
>>>>>>> 213db15 (checkout - integrate tnc)
        loading: false,
      };
    },
    /** => failed */
    [types.PAYMENT_LAST_CHANNEL_DETAIL_FAILED](
      state = paymentLastChannelDetailInitialState,
<<<<<<< HEAD
      { payload }: models.DetailFailedAction,
=======
      action: models.DetailFailedAction,
>>>>>>> 213db15 (checkout - integrate tnc)
    ) {
      return {
        ...state,
        loading: false,
<<<<<<< HEAD
        error: payload,
=======
        error: action.payload,
>>>>>>> 213db15 (checkout - integrate tnc)
      };
    },

    /** => reset */
<<<<<<< HEAD
    [types.PAYMENT_LAST_CHANNEL_DETAIL_RESET]() {
      return paymentLastChannelDetailInitialState;
    },
  },
);
=======
    [types.PAYMENT_LAST_CHANNEL_DETAIL_RESET](){
      return paymentLastChannelDetailInitialState
    }
  }
);
>>>>>>> 213db15 (checkout - integrate tnc)
