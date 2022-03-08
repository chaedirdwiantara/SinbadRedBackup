import * as types from '@types';
import * as models from '@models';

/** === ACTION === */
/** => PROCESS */
export const checkoutProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<models.CheckoutPayload>,
): models.CreateProcessAction<models.CheckoutPayload> => {
  contextDispatch({
    type: types.CHECKOUT_PROCESS,
    payload: data,
  });
  return {
    type: types.CHECKOUT_PROCESS,
    payload: data,
    contextDispatch,
  };
};

/** => SUCCESS */
export const checkoutSuccess = (
  data: models.CreateSuccessV3Props<models.CheckoutResponse>,
): models.CreateSuccessV3Action<models.CheckoutResponse> => {
  return { type: types.CHECKOUT_SUCCESS, payload: data };
};

/** => FAILED */
export const checkoutFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CHECKOUT_FAILED, payload: data };
};

/** => RESET */
export const checkoutReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.CHECKOUT_RESET });
  return { type: types.CHECKOUT_RESET };
};
