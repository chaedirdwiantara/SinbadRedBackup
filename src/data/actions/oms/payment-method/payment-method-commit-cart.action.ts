import * as types from '@types';
import * as models from '@models';

/** === ACTION === */
/** => PROCESS */
export const paymentMethodCommitCartProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<models.PaymentMethodCommitCartData>,
): models.CreateProcessAction<models.PaymentMethodCommitCartData> => {
  contextDispatch({
    type: types.PAYMENT_METHOD_COMMIT_CART_PROCESS,
    payload: data,
  });
  return {
    type: types.PAYMENT_METHOD_COMMIT_CART_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => SUCCESS */
export const paymentMethodCommitCartSuccess = (
  data: models.CreateSuccessV3Props<models.CommitCartResponse>,
): models.CreateSuccessV3Action<models.CommitCartResponse> => {
  return { type: types.PAYMENT_METHOD_COMMIT_CART_SUCCESS, payload: data };
};
/** => FAILED */
export const paymentMethodCommitCartFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.PAYMENT_METHOD_COMMIT_CART_FAILED, payload: data };
};
/** => RESET */
export const paymentMethodCommitCartReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.PAYMENT_METHOD_COMMIT_CART_RESET });
  return { type: types.PAYMENT_METHOD_COMMIT_CART_RESET };
};
