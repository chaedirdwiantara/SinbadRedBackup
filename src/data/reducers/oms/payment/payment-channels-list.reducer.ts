/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PaymentChannelsListInitialProps = models.ListItemProps<
  models.IPaymentChannelsList[]
>;
/** === INITIAL STATE HERE === */
export const paymentChannelsListInitialState: PaymentChannelsListInitialProps =
  {
    data: [],
    error: null,
    loading: false,
    loadMore: false,
    refresh: false,
    total: 0,
    skip: 0,
  };
/** === FUNCTION HERE === */
export const paymentChannelsListReducer = simplifyReducer(
  paymentChannelsListInitialState,
  {
    /** ===> LIST */
    /** => list process */
    [types.PAYMENT_CHANNELS_LIST_PROCESS](
      state = paymentChannelsListInitialState,
      action: models.ListProcessAction,
    ) {
      return {
        ...state,
        loading: action.payload.loading,
        error: null,
      };
    },
    /** => list success */
    [types.PAYMENT_CHANNELS_LIST_SUCCESS](
      state = paymentChannelsListInitialState,
      action: models.ListSuccessAction<models.IPaymentChannelsList[]>,
    ) {
      return {
        ...state,
        data: [...action.payload.data],
        loading: false,
      };
    },
    /** => list failed */
    [types.PAYMENT_CHANNELS_LIST_FAILED](
      state = paymentChannelsListInitialState,
      action: models.ListFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
);
