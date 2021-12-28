import * as types from '@types';
import * as models from '@models';
/** === SEND DATA TO SUPPLIER === */
/** => Process */
export const sendDataToSupplierProcess = (
  contextDispatch: (action: any) => any,
  payload: models.CreateProcessProps<models.SendDataSupplierPayload>,
): models.CreateProcessAction<models.SendDataSupplierPayload> => {
  contextDispatch({
    type: types.SEND_DATA_SUPPLIER_PROCESS,
    payload,
  });
  return {
    type: types.SEND_DATA_SUPPLIER_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const sendDataToSupplierSuccess = (
  payload: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.SEND_DATA_SUPPLIER_SUCCESS, payload };
};
/** => Failed */
export const sendDataToSupplierFailed = (
  payload: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.SEND_DATA_SUPPLIER_FAILED, payload };
};
/** => Refresh */
export const sendDataToSupplierRefresh = () => {
  return { type: types.SEND_DATA_SUPPLIER_REFRESH };
};
/** => Reset */
export const sendDataToSupplierReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({
    type: types.SEND_DATA_SUPPLIER_RESET,
  });
  return { type: types.SEND_DATA_SUPPLIER_RESET };
};
/** => Process */
export const registerSupplierProcess = (
  contextDispatch: (action: any) => any,
  payload: models.CreateProcessProps<models.SendDataSupplierPayload>,
): models.CreateProcessAction<models.SendDataSupplierPayload> => {
  contextDispatch({
    type: types.REGISTER_SUPPLIER_PROCESS,
    payload,
  });
  return {
    type: types.REGISTER_SUPPLIER_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const registerSupplierSuccess = (
  payload: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.REGISTER_SUPPLIER_SUCCESS, payload };
};
/** => Failed */
export const registerSupplierFailed = (
  payload: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.REGISTER_SUPPLIER_FAILED, payload };
};
/** => Refresh */
export const registerSupplierRefresh = () => {
  return { type: types.REGISTER_SUPPLIER_REFRESH };
};
/** => Reset */
export const registerSupplierReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({
    type: types.REGISTER_SUPPLIER_RESET,
  });
  return { type: types.REGISTER_SUPPLIER_RESET };
};
