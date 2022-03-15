/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PaymentMethodCreateOrderProps = models.CreateItemV3Props<
  models.PaymentMethodCreateOrderResponse[]
>;
/** === INITIAL STATE HERE === */
export const PaymentMethodCreateOrderInitialState: PaymentMethodCreateOrderProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const paymentMethodCreateOrderReducer = simplifyReducer(
  PaymentMethodCreateOrderInitialState,
  {
    /** => PROCESS */
    [types.POST_CREATE_ORDER_PROCESS]() {
      return {
        ...PaymentMethodCreateOrderInitialState,
        loading: true,
      };
    },
    /** => SUCCESS */
    [types.POST_CREATE_ORDER_SUCCESS](
      state = PaymentMethodCreateOrderInitialState,
      action: models.CreateSuccessV3Action<
        models.PaymentMethodCreateOrderResponse[]
      >,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => FAILED */
    [types.POST_CREATE_ORDER_FAILED](
      state = PaymentMethodCreateOrderInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => RESET */
    [types.POST_CREATE_ORDER_RESET]() {
      return PaymentMethodCreateOrderInitialState;
    },
  },
);
