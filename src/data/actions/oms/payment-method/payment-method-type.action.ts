import * as types from '@types';
import * as models from '@models';

/** => process */
export const paymentMethodTypeProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({
    type: types.PAYMENT_METHOD_TYPE_PROCESS,
    payload: data,
  });
  return {
    type: types.PAYMENT_METHOD_TYPE_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => success */
export const paymentMethodTypeSuccess = (
  data: models.DetailSuccessProps<models.PaymentMethodType>,
): models.DetailSuccessAction<models.PaymentMethodType> => {
  return { type: types.PAYMENT_METHOD_TYPE_SUCCESS, payload: data };
};
/** => failed */
export const paymentMethodTypeFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.PAYMENT_METHOD_TYPE_FAILED, payload: data };
};
/** => reset */
export const paymentMethodTypeReset = () => {
  return { type: types.PAYMENT_METHOD_TYPE_RESET };
};
/** => loading */
export const paymentMethodTypeLoading = () => {
  return { type: types.PAYMENT_METHOD_TYPE_LOADING };
};
