import * as types from '@types';
import * as models from '@models';

/** => process */
export const paymentMethodGetWaitingPaymentOrderProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({
    type: types.PAYMENT_METHOD_GET_WAITING_PAYMENT_ORDER_PROCESS,
    payload: data,
  });
  return {
    type: types.PAYMENT_METHOD_GET_WAITING_PAYMENT_ORDER_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => success */
export const paymentMethodGetWaitingPaymentOrderSuccess = (
  data: models.DetailSuccessProps<models.PaymentMethodGetWaitingPaymentOrder>,
): models.DetailSuccessAction<models.PaymentMethodGetWaitingPaymentOrder> => {
  return {
    type: types.PAYMENT_METHOD_GET_WAITING_PAYMENT_ORDER_SUCCESS,
    payload: data,
  };
};
/** => failed */
export const paymentMethodGetWaitingPaymentOrderFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return {
    type: types.PAYMENT_METHOD_GET_WAITING_PAYMENT_ORDER_FAILED,
    payload: data,
  };
};
/** => reset */
export const paymentMethodGetWaitingPaymentOrderReset = () => {
  return { type: types.PAYMENT_METHOD_GET_WAITING_PAYMENT_ORDER_RESET };
};
/** => loading */
export const paymentMethodGetWaitingPaymentOrderLoading = () => {
  return { type: types.PAYMENT_METHOD_GET_WAITING_PAYMENT_ORDER_LOADING };
};
