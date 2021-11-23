import * as types from '@types';
import * as models from '@models';
/** === LIST === */
/** => list supplier process */
export const paymentTypesListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types, payload: data });
  console.log('ACTION PROCESS', data);
  
  return { type: types.PAYMENT_TYPES_LIST_PROCESS, payload: data, contextDispatch };
};
/** => list supplier success */
export const paymentTypesListSuccess = (
  data: models.ListSuccessProps<models.IPaymentTypesList[]>,
): models.ListSuccessAction<models.IPaymentTypesList[]> => {
  console.log('ACTION SUCCESS');
  return { type: types.PAYMENT_TYPES_LIST_SUCCESS, payload: data};
};
/** => list supplier failed */
export const paymentTypesListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PAYMENT_TYPES_LIST_SUCCESS, payload: data };
};