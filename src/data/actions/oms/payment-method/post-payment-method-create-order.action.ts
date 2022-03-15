import * as types from '@types';
import * as models from '@models';

/** === ACTION === */
/** => PROCESS */
export const postPaymentMethodCreateOrder = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<models.PaymentMethodCreateOrderData>,
): models.CreateProcessAction<models.PaymentMethodCreateOrderData> => {
  contextDispatch({
    type: types.POST_CREATE_ORDER_PROCESS,
    payload: data,
  });
  return {
    type: types.POST_CREATE_ORDER_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => SUCCESS */
export const postPaymentMethodCreateOrderSuccess = (
  data: models.CreateSuccessV3Props<models.PaymentMethodCreateOrderResponse[]>,
): models.CreateSuccessV3Action<models.PaymentMethodCreateOrderResponse[]> => {
  return { type: types.POST_CREATE_ORDER_SUCCESS, payload: data };
};
/** => FAILED */
export const postPaymentMethodCreateOrderFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.POST_CREATE_ORDER_FAILED, payload: data };
};
/** => RESET */
export const postPaymentMethodCreateOrderReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.POST_CREATE_ORDER_RESET });
  return { type: types.POST_CREATE_ORDER_RESET };
};
