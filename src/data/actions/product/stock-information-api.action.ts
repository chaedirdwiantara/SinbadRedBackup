/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const stockInformationProcess = (
  contextDispatch: (action: any) => any,
  payload: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types.STOCK_INFORMATION_PROCESS, payload });
  return {
    type: types.STOCK_INFORMATION_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const stockInformationSuccess = (
  payload: models.DetailSuccessProps<models.IStockInformationSuccess>,
): models.DetailSuccessAction<models.IStockInformationSuccess> => {
  return { type: types.STOCK_INFORMATION_SUCCESS, payload };
};
/** => Failed */
export const stockInformationFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.STOCK_INFORMATION_FAILED, payload };
};
/** => Refresh */
export const stockInformationRefresh = () => {
  return { type: types.STOCK_INFORMATION_REFRESH };
};
/** => Reset */
export const stockInformationReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.STOCK_INFORMATION_RESET });
  return { type: types.STOCK_INFORMATION_RESET };
};
