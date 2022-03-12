/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type paymentMethodListInitialProps =
  models.DetailItemProps<models.PaymentMethodList>;
/** === INITIAL STATE HERE === */
export const paymentMethodListInitialState: paymentMethodListInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const paymentMethodListReducer = simplifyReducer(
  paymentMethodListInitialState,
  {
    /** ===> DETAIL */
    /** => process */
    [types.PAYMENT_METHOD_LIST_PROCESS]() {
      return {
        ...paymentMethodListInitialState,
        loading: true,
      };
    },
    /** => success */
    [types.PAYMENT_METHOD_LIST_SUCCESS](
      state = paymentMethodListInitialState,
      action: models.DetailSuccessAction<models.PaymentMethodList>,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.PAYMENT_METHOD_LIST_FAILED](
      state = paymentMethodListInitialState,
      action: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => reset */
    [types.PAYMENT_METHOD_LIST_RESET]() {
      return paymentMethodListInitialState;
    },
    /** => process */
    [types.PAYMENT_METHOD_LIST_LOADING]() {
      return {
        ...paymentMethodListInitialState,
        loading: true,
      };
    },
  },
);
