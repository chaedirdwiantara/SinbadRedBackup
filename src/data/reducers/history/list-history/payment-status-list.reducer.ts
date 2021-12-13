/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PaymentStatusListInitialProps = models.ListItemProps<models.IPaymentStatusList[]>;
/** === INITIAL STATE HERE === */
export const paymentStatusListInitialState: PaymentStatusListInitialProps = {
  data: [],
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const paymentStatusListReducer = simplifyReducer(paymentStatusListInitialState, {
  /** ===> LIST */
  /** => list process */
  [types.PAYMENT_STATUS_LIST_PROCESS](
    state = paymentStatusListInitialState,
    action: models.ListProcessAction,
  ) {
    return {
      ...state,
      loading: action.payload.loading,
      error: null,
    };
  },
  /** => list success */
  [types.PAYMENT_STATUS_LIST_SUCCESS](
    state = paymentStatusListInitialState,
    action: models.ListSuccessAction<models.IPaymentStatusList[]>,
  ) {
    return {
      ...state,
      data: [...action.payload.data],
      loading: false,
    };
  },
  /** => list failed */
  [types.PAYMENT_STATUS_LIST_FAILED](
    state = paymentStatusListInitialState,
    action: models.ListFailedAction,
  ) {
    return {
      ...state,
      loading: false,
    };
  },
});
