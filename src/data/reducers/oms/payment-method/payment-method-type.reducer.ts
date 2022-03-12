/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PaymentMethodTypeInitialProps =
  models.DetailItemProps<models.PaymentMethodType>;
/** === INITIAL STATE HERE === */
export const paymentMethodTypeInitialState: PaymentMethodTypeInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const paymentMethodTypeReducer = simplifyReducer(
  paymentMethodTypeInitialState,
  {
    /** ===> DETAIL */
    /** => process */
    [types.PAYMENT_METHOD_TYPE_PROCESS]() {
      return {
        ...paymentMethodTypeInitialState,
        loading: true,
      };
    },
    /** => success */
    [types.PAYMENT_METHOD_TYPE_SUCCESS](
      state = paymentMethodTypeInitialState,
      action: models.DetailSuccessAction<models.PaymentMethodType>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.PAYMENT_METHOD_TYPE_FAILED](
      state = paymentMethodTypeInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.PAYMENT_METHOD_TYPE_RESET]() {
      return paymentMethodTypeInitialState;
    },
    /** => process */
    [types.PAYMENT_METHOD_TYPE_LOADING]() {
      return {
        ...paymentMethodTypeInitialState,
        loading: true,
      };
    },
  },
);
