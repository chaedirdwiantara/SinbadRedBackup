/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type PaymentDetailInitialProps =
  models.DetailItemProps<models.PaymentDetailSuccessProps>;
/** === INITIAL STATE === */
export const paymentDetailInitialState: PaymentDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const paymentDetailReducer = simplifyReducer(paymentDetailInitialState, {
  /** Process */
  [types.HISTORY_PAYMENT_DETAIL_PROCESS]() {
    return {
      ...paymentDetailInitialState,
      loading: true,
    };
  },
  /** Success */
  [types.HISTORY_PAYMENT_DETAIL_SUCCESS](
    state = paymentDetailInitialState,
    action: models.DetailSuccessAction<models.PaymentDetailSuccessProps>,
  ) {
    return {
      ...state,
      data: action.payload.data,
      loading: false,
    };
  },
  /** Failed */
  [types.HISTORY_PAYMENT_DETAIL_FAILED](
    state = paymentDetailInitialState,
    action: models.DetailFailedAction,
  ) {
    return {
      ...state,
      error: action.payload,
      loading: false,
    };
  },
});
