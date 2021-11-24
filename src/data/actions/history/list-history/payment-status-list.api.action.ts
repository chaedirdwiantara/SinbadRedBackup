import * as types from '@types';
import * as models from '@models';
/** === LIST === */
/** => list supplier process */
export const paymentStatusListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types, payload: data });
  return {
    type: types.PAYMENT_STATUS_LIST_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => list supplier success */
export const paymentStatusListSuccess = (
  data: models.ListSuccessProps<models.IPaymentStatusList[]>,
): models.ListSuccessAction<models.IPaymentStatusList[]> => {
  return { type: types.PAYMENT_STATUS_LIST_SUCCESS, payload: data };
};
/** => list supplier failed */
export const paymentStatusListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PAYMENT_STATUS_LIST_FAILED, payload: data };
};
