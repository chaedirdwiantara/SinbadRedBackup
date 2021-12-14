import * as types from '@types';
import * as models from '@models';
/** === LIST === */
/** => payment types process */
export const paymentTypesListProcess = (
  contextDispatch: (action: any) => any,
  data: models.IPaymentTypeProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.PAYMENT_TYPES_LIST_PROCESS, payload: data });
  return {
    type: types.PAYMENT_TYPES_LIST_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => payment types success */
export const paymentTypesListSuccess = (
  data: models.ListSuccessProps<models.IPaymentTypesList[]>,
): models.ListSuccessAction<models.IPaymentTypesList[]> => {
  return { type: types.PAYMENT_TYPES_LIST_SUCCESS, payload: data };
};
/** => payment types failed */
export const paymentTypesListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PAYMENT_TYPES_LIST_FAILED, payload: data };
};

/** => payment channels reset */
export const resetPaymentTypesList = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.RESET_PAYMENT_TYPES_LIST });
  return {
    type: types.RESET_PAYMENT_TYPES_LIST,
  };
};

/** ==> payment channels list */
/** => payment channels process */
export const paymentChannelsListProcess = (
  contextDispatch: (action: any) => any,
  data: models.IPaymentChannelProcessProps,
): models.ListProcessAction => {
  contextDispatch({ type: types.PAYMENT_CHANNELS_LIST_PROCESS, payload: data });
  return {
    type: types.PAYMENT_CHANNELS_LIST_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => payment channels success */
export const paymentChannelsListSuccess = (
  data: models.ListSuccessProps<models.IPaymentChannelsList[]>,
): models.ListSuccessAction<models.IPaymentChannelsList[]> => {
  return { type: types.PAYMENT_CHANNELS_LIST_SUCCESS, payload: data };
};
/** => payment channels failed */
export const paymentChannelsListFailed = (
  data: models.ErrorProps,
): models.ListFailedAction => {
  return { type: types.PAYMENT_CHANNELS_LIST_FAILED, payload: data };
};
/** => payment channels reset */
export const paymentChannelsListReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.PAYMENT_CHANNELS_LIST_RESET });
  return {
    type: types.PAYMENT_CHANNELS_LIST_RESET,
  };
};

/** => payment terms and condition create process */
export const paymentTCCreateProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<{}>,
): models.CreateProcessAction => {
  contextDispatch({
    type: types.PAYMENT_TC_CREATE_PROCESS,
    payload: data,
  });
  return {
    type: types.PAYMENT_TC_CREATE_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => payment terms and condition create success */
export const paymentTCCreateSuccess = (
  data: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.PAYMENT_TC_CREATE_SUCCESS, payload: data };
};
/** payment terms and condition create failed */
export const paymentTCCreateFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.PAYMENT_TC_CREATE_FAILED, payload: data };
};
/** reset last payment channel detail  */
export const paymentTCCreateReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({
    type: types.RESET_PAYMENT_TC_CREATE,
  });
  return {
    type: types.RESET_PAYMENT_TC_CREATE,
  };
};

/** === PAYMENT TERMS AND CONDITION DETAIL === */
/** => process */
export const paymentTCDetailProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({
    type: types.PAYMENT_TC_DETAIL_PROCESS,
    payload: data,
  });
  return {
    type: types.PAYMENT_TC_DETAIL_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => process */
export const paymentTCDetailSuccess = (
  data: models.DetailSuccessProps<models.IPaymentTermsAndConditionDetailProps>,
): models.DetailSuccessAction<models.IPaymentTermsAndConditionDetailProps> => {
  return { type: types.PAYMENT_TC_DETAIL_SUCCESS, payload: data };
};
/** => failed */
export const paymentTCDetailFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.PAYMENT_TC_DETAIL_FAILED, payload: data };
};
/** reset last payment channel detail  */
export const paymentTCDetailReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({
    type: types.RESET_PAYMENT_TC_DETAIL,
  });
  return {
    type: types.RESET_PAYMENT_TC_DETAIL,
  };
};

/** === PAYMENT LAST PAYMENT CHANNEL CREATE  */

/** => payment last payment channel create process */
export const paymentLastChannelCreateProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<{}>,
): models.CreateProcessAction => {
  contextDispatch({
    type: types.PAYMENT_LAST_CHANNEL_CREATE_PROCESS,
    payload: data,
  });
  return {
    type: types.PAYMENT_LAST_CHANNEL_CREATE_PROCESS,
    payload: data.data,
    contextDispatch,
  };
};
/** => payment last payment channel create success */
export const paymentLastChannelCreateSuccess = (
  data: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.PAYMENT_LAST_CHANNEL_CREATE_SUCCESS, payload: data };
};
/** payment last payment channel create failed */
export const paymentLastChannelCreateFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.PAYMENT_LAST_CHANNEL_CREATE_FAILED, payload: data };
};
/** reset last payment channel create  */
export const paymentLastChannelCreateReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({
    type: types.PAYMENT_LAST_CHANNEL_CREATE_RESET,
  });
  return {
    type: types.PAYMENT_LAST_CHANNEL_CREATE_RESET,
  };
};
/** === PAYMENT LAST PAYMENT CHANNELS DETAIL === */
/** => process */
export const paymentLastChannelDetailProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({
    type: types.PAYMENT_LAST_CHANNEL_DETAIL_PROCESS,
    payload: data,
  });
  return {
    type: types.PAYMENT_LAST_CHANNEL_DETAIL_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => process */
export const paymentLastChannelDetailSuccess = (
  data: models.DetailSuccessProps<models.IPaymentLastChannelDetailProps>,
): models.DetailSuccessAction<models.IPaymentLastChannelDetailProps> => {
  return { type: types.PAYMENT_LAST_CHANNEL_DETAIL_SUCCESS, payload: data };
};
/** => failed */
export const paymentLastChannelDetailFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.PAYMENT_LAST_CHANNEL_DETAIL_FAILED, payload: data };
};
/** reset last payment channel create  */
export const paymentLastChannelDetailReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({
    type: types.PAYMENT_LAST_CHANNEL_DETAIL_RESET,
  });
  return {
    type: types.PAYMENT_LAST_CHANNEL_DETAIL_RESET,
  };
};

/** payment invoice channel list */
/** => process */
export const paymentInvoiceChannelListProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({
    type: types.PAYMENT_LIST_INVOICE_CHANNEL_PROCESS,
    payload: data,
  });
  return {
    type: types.PAYMENT_LIST_INVOICE_CHANNEL_PROCESS,
    payload: data,
    contextDispatch,
  };
};

/** reset last payment channel detail  */
export const paymentInvoiceChannelListReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({
    type: types.PAYMENT_LIST_INVOICE_CHANNEL_RESET,
  });
  return {
    type: types.PAYMENT_LIST_INVOICE_CHANNEL_RESET,
  };
};
