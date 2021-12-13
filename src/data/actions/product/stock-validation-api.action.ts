/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const stockValidationProcess = (
  contextDispatch: (action: any) => any,
  payload: models.StockValidationProcessProps,
): models.StockValidationProcessAction => {
  contextDispatch({ type: types.STOCK_VALIDATION_PROCESS, payload });
  return {
    type: types.STOCK_VALIDATION_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const stockValidationSuccess = (
  payload: models.DetailSuccessProps<models.IStockValidaitonSuccess>,
): models.DetailSuccessAction<models.IStockValidaitonSuccess> => {
  return { type: types.STOCK_VALIDATION_SUCCESS, payload };
};
/** => Failed */
export const stockValidationFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.STOCK_VALIDATION_FAILED, payload };
};
/** => Refresh */
export const stockValidationRefresh = () => {
  return { type: types.STOCK_VALIDATION_REFRESH };
};
/** => Reset */
export const stockValidationReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.STOCK_VALIDATION_RESET });
  return { type: types.STOCK_VALIDATION_RESET };
};
/** => Process */
export const stockValidationDetailProcess = (
  contextDispatch: (action: any) => any,
  payload: models.StockValidationProcessProps,
): models.StockValidationProcessAction => {
  contextDispatch({ type: types.STOCK_VALIDATION_DETAIL_PROCESS, payload });
  return {
    type: types.STOCK_VALIDATION_DETAIL_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const stockValidationDetailSuccess = (
  payload: models.DetailSuccessProps<models.IStockValidaitonSuccess>,
): models.DetailSuccessAction<models.IStockValidaitonSuccess> => {
  return { type: types.STOCK_VALIDATION_DETAIL_SUCCESS, payload };
};
/** => Failed */
export const stockValidationDetailFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.STOCK_VALIDATION_DETAIL_FAILED, payload };
};
/** => Refresh */
export const stockValidationDetailRefresh = () => {
  return { type: types.STOCK_VALIDATION_DETAIL_REFRESH };
};
/** => Reset */
export const stockValidationDetailReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.STOCK_VALIDATION_DETAIL_RESET });
  return { type: types.STOCK_VALIDATION_DETAIL_RESET };
};
