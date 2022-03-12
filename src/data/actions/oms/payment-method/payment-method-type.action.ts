import * as types from '@types';
import * as models from '@models';

/** => process */
export const paymentMethodListProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
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
  data: models.DetailSuccessProps<models.PaymentMethodList>,
): models.DetailSuccessAction<models.PaymentMethodList> => {
  return { type: types.PAYMENT_METHOD_LIST_SUCCESS, payload: data };
};
/** => failed */
export const paymentMethodListFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
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
