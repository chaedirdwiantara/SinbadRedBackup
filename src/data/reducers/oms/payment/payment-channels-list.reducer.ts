/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PaymentChannelsListInitialProps = models.ListItemProps<
  models.IPaymentChannelsList[]
>;
/** === INITIAL STATE HERE === */
export const paymentChannelsListInitialState: Omit<
  PaymentChannelsListInitialProps,
  'loadMore' | 'refresh' | 'total' | 'skip'
> = {
  data: [],
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const paymentChannelsListReducer = simplifyReducer(
  paymentChannelsListInitialState,
  {
    /** ===> LIST */
    /** => list process */
    [types.PAYMENT_CHANNELS_LIST_PROCESS](
      state = paymentChannelsListInitialState,
      { payload }: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: payload.loading,
        error: null,
      };
    },
    /** => list success */
    [types.PAYMENT_CHANNELS_LIST_SUCCESS](
      state = paymentChannelsListInitialState,
      { payload }: models.ListSuccessAction<models.IPaymentChannelsList[]>,
    ) {
      return {
        ...state,
        data: [...payload.data],
        loading: false,
      };
    },
    /** => list failed */
    [types.PAYMENT_CHANNELS_LIST_FAILED](
      state = paymentChannelsListInitialState,
      { payload }: models.ListFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },
  },
);
