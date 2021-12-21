/** === IMPORT INTERNAL === */
import simplifyReducer from '@core/redux/simplifyReducer';
import * as models from '@models';
import * as types from '@types';
/** === TYPE === */
export type PaymentActivateVAInitialProps =
  models.DetailItemProps<models.PaymentActivateVASuccessProps>;
/** === INITIAL STATE === */
export const paymentActivateVAInitialState: PaymentActivateVAInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === REDUCER === */
export const paymentActivateVAReducer = simplifyReducer(
  paymentActivateVAInitialState,
  {
    /** Process */
    [types.HISTORY_ACTIVATE_VA_PROCESS]() {
      return {
        ...paymentActivateVAInitialState,
        loading: true,
      };
    },
    /** Success */
    [types.HISTORY_ACTIVATE_VA_SUCCESS](
      state = paymentActivateVAInitialState,
      action: models.UpdateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** Failed */
    [types.HISTORY_ACTIVATE_VA_FAILED](
      state = paymentActivateVAInitialState,
      action: models.UpdateFailedAction,
    ) {
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    },
  },
);
