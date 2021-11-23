import * as types from '@types';
import * as models from '@models';
/** === LIST === */
/** => payment types process */
export const paymentTypesListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.PAYMENT_TYPES_LIST_PROCESS, payload: data });
  return { type: types.PAYMENT_TYPES_LIST_PROCESS, payload: data, contextDispatch };
};
/** => payment types success */
export const paymentTypesListSuccess = (
  data: models.ListSuccessProps<models.IPaymentTypesList[]>,
): models.ListSuccessAction<models.IPaymentTypesList[]> => {
  return { type: types.PAYMENT_TYPES_LIST_SUCCESS, payload: data};
};
/** => payment types failed */
export const paymentTypesListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PAYMENT_TYPES_LIST_FAILED, payload: data };
};

/** ==> payment channels list */
/** => payment channels process */
export const paymentChannelsListProcess = (
  contextDispatch: (action: any) => any,
  data: models.ListProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.PAYMENT_CHANNELS_LIST_PROCESS, payload: data });
  return { type: types.PAYMENT_CHANNELS_LIST_PROCESS, payload: data, contextDispatch };
};
/** => payment channels success */
export const paymentChannelsListSuccess = (
  data: models.ListSuccessProps<models.IPaymentChannelsList[]>,
): models.ListSuccessAction<models.IPaymentChannelsList[]> => {
  return { type: types.PAYMENT_CHANNELS_LIST_SUCCESS, payload: data};
};
/** => payment channels failed */
export const paymentChannelsListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PAYMENT_CHANNELS_LIST_FAILED, payload: data };
};


