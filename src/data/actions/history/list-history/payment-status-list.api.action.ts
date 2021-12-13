import * as types from '@types';
import * as models from '@models';
/** === LIST === */
/** => list supplier process */
export const paymentStatusListProcess = (
  contextDispatch: (action: any) => any,
  payload: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types, payload });
  return {
    type: types.PAYMENT_STATUS_LIST_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => list supplier success */
export const paymentStatusListSuccess = (
  payload: models.ListSuccessProps<models.IPaymentStatusList[]>,
): models.ListSuccessAction<models.IPaymentStatusList[]> => {
  return { type: types.PAYMENT_STATUS_LIST_SUCCESS, payload };
};
/** => list supplier failed */
export const paymentStatusListFailed = (
  payload: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PAYMENT_STATUS_LIST_FAILED, payload };
};
