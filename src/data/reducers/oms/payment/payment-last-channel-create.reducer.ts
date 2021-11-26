/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PaymentLastChannelCreateInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
const INITIAL_STATE = {
  data: null,
  error: null,
  loading: false,
};
export const paymentLastChannelCreateInitialState: PaymentLastChannelCreateInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const paymentLastChannelCreateReducer = simplifyReducer(
  paymentLastChannelCreateInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.PAYMENT_LAST_CHANNEL_CREATE_PROCESS]() {
      return {
        ...paymentLastChannelCreateInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.PAYMENT_LAST_CHANNEL_CREATE_SUCCESS](
      state = paymentLastChannelCreateInitialState,
      { payload }: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.PAYMENT_LAST_CHANNEL_CREATE_FAILED](
      state = paymentLastChannelCreateInitialState,
      { payload }: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
    /** => reset */
    [types.PAYMENT_LAST_CHANNEL_CREATE_RESET]() {
      return INITIAL_STATE;
    },
  },
);
