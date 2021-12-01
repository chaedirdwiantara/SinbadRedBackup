/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PaymentTCCreateInitialProps = models.CreateItemProps;
/** === INITIAL STATE HERE === */
export const paymentTCCreateInitialState: PaymentTCCreateInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const paymentTCCreateReducer = simplifyReducer(
  paymentTCCreateInitialState,
  {
    /** ===> DETAIL */
    /** => create process */
    [types.PAYMENT_TC_CREATE_PROCESS]() {
      return {
        ...paymentTCCreateInitialState,
        loading: true,
      };
    },
    /** => create success */
    [types.PAYMENT_TC_CREATE_SUCCESS](
      state = paymentTCCreateInitialState,
      action: models.CreateSuccessAction,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => create failed */
    [types.PAYMENT_TC_CREATE_FAILED](
      state = paymentTCCreateInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
  },
);
