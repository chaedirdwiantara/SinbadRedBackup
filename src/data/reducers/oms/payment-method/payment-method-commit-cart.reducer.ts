/** === IMPORT HERE === */
import * as types from '@types';
import * as models from '@models';
import simplifyReducer from '@core/redux/simplifyReducer';
/** === TYPE HERE === */
export type PaymentMethodCommitCartInitialProps = models.CreateItemV3Props<
  models.CommitCartResponse
>;
/** === INITIAL STATE HERE === */
export const PaymentMethodCommitCartInitialState: PaymentMethodCommitCartInitialProps =
  {
    data: null,
    error: null,
    loading: false,
  };
/** === FUNCTION HERE === */
export const paymentMethodCommitCartReducer = simplifyReducer(
  PaymentMethodCommitCartInitialState,
  {
    /** => PROCESS */
    [types.PAYMENT_METHOD_COMMIT_CART_PROCESS]() {
      return {
        ...PaymentMethodCommitCartInitialState,
        loading: true,
      };
    },
    /** => SUCCESS */
    [types.PAYMENT_METHOD_COMMIT_CART_SUCCESS](
      state = PaymentMethodCommitCartInitialState,
      action: models.CreateSuccessV3Action<
        models.CommitCartResponse
      >,
    ) {
      return {
        ...state,
        data: action.payload.data,
        loading: false,
      };
    },
    /** => FAILED */
    [types.PAYMENT_METHOD_COMMIT_CART_FAILED](
      state = PaymentMethodCommitCartInitialState,
      action: models.CreateFailedAction,
    ) {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    },
    /** => RESET */
    [types.PAYMENT_METHOD_COMMIT_CART_RESET]() {
      return PaymentMethodCommitCartInitialState;
    },
  },
);
