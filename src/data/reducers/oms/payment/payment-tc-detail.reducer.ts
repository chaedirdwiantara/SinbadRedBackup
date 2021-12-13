/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PaymentTCDetailInitialProps = models.DetailItemProps<{}>;
/** === INITIAL STATE HERE === */
export const paymentTCDetailInitialState: PaymentTCDetailInitialProps = {
  data: null,
  error: null,
  loading: false,
};
/** === FUNCTION HERE === */
export const paymentTCDetailReducer = simplifyReducer(
  paymentTCDetailInitialState,
  {
    /** ===> DETAIL */
    /** => process */
    [types.PAYMENT_TC_DETAIL_PROCESS]() {
      return {
        ...paymentTCDetailInitialState,
        loading: true,
      };
    },
    /** => success */
    [types.PAYMENT_TC_DETAIL_SUCCESS](
      state = paymentTCDetailInitialState,
      {
        payload,
      }: models.DetailSuccessAction<models.IPaymentTermsAndConditionDetailProps>,
    ) {
      return {
        ...state,
        data: payload.data,
        loading: false,
      };
    },
    /** => failed */
    [types.PAYMENT_TC_DETAIL_FAILED](
      state = paymentTCDetailInitialState,
      { payload }: models.DetailFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: payload,
      };
    },

    /** => reset */
    [types.RESET_PAYMENT_TC_DETAIL]() {
      return paymentTCDetailInitialState;
    },
  },
);
