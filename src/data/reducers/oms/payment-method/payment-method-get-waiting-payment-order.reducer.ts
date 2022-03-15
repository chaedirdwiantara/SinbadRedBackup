/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type paymentMethodGetWaitingPaymentOrderInitialProps =
  models.DetailItemProps<models.PaymentMethodGetWaitingPaymentOrder>;
/** === INITIAL STATE HERE === */
export const paymentMethodGetWaitingPaymentOrderInitialState: paymentMethodGetWaitingPaymentOrderInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const paymentMethodGerWaitingPaymentOrderReducer = simplifyReducer(
  paymentMethodGetWaitingPaymentOrderInitialState,
  {
    /** ===> DETAIL */
    /** => process */
    [types.PAYMENT_METHOD_GET_WAITING_PAYMENT_ORDER_PROCESS]() {
      return {
        ...paymentMethodGetWaitingPaymentOrderInitialState,
        loading: true,
      };
    },
    /** => success */
    [types.PAYMENT_METHOD_GET_WAITING_PAYMENT_ORDER_SUCCESS](
      state = paymentMethodGetWaitingPaymentOrderInitialState,
      action: models.DetailSuccessAction<models.PaymentMethodGetWaitingPaymentOrder>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.PAYMENT_METHOD_GET_WAITING_PAYMENT_ORDER_FAILED](
      state = paymentMethodGetWaitingPaymentOrderInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.PAYMENT_METHOD_GET_WAITING_PAYMENT_ORDER_RESET]() {
      return paymentMethodGetWaitingPaymentOrderInitialState;
    },
    /** => process */
    [types.PAYMENT_METHOD_GET_WAITING_PAYMENT_ORDER_LOADING]() {
      return {
        ...paymentMethodGetWaitingPaymentOrderInitialState,
        loading: true,
      };
    },
  },
);
