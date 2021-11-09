import * as types from '@types';
import * as models from '@models';
/** === SEND DATA TO SUPPLIER === */
/** => Process */
export const sendDataToSupplierProcess = (
  contextDispatch: (action: any) => any,
  payload: models.CreateProcessProps<{}>,
): models.CreateProcessAction => {
  contextDispatch({
    type: types.SEND_DATA_SUPPLIER_PROCESS,
    payload,
  });
  return {
    type: types.SEND_DATA_SUPPLIER_PROCESS,
    payload: payload.data,
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
export const sendDataToSupplierReset = () => {
  return { type: types.SEND_DATA_SUPPLIER_RESET };
};
