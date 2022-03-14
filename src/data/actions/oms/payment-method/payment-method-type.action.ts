import * as types from '@types';
import * as models from '@models';

/** => process */
export const paymentMethodListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({
    type: types.PAYMENT_METHOD_LIST_PROCESS,
    payload: data,
  });
  return {
    type: types.PAYMENT_METHOD_LIST_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => success */
export const paymentMethodListSuccess = (
  payload: models.ListSuccessProps<models.PaymentMethodList[]>,
): models.ListSuccessAction<models.PaymentMethodList[]> => {
  return { type: types.PAYMENT_METHOD_LIST_SUCCESS, payload };
};
/** => failed */
export const paymentMethodListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PAYMENT_METHOD_LIST_FAILED, payload: data };
};
/** => reset */
export const paymentMethodListReset = () => {
  return { type: types.PAYMENT_METHOD_LIST_RESET };
};
/** => loading */
export const paymentMethodListLoading = () => {
  return { type: types.PAYMENT_METHOD_LIST_LOADING };
};
