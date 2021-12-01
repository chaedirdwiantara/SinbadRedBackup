import * as types from '@types';
import * as models from '@models';
/** === DELETE RESERVE STOCK === */
/** => delete reserve stock process */
export const deleteReserveStockProcess = (
  contextDispatch: (action: any) => any,
  data: models.DeleteProcessProps,
): models.DeleteProcessAction => {
  contextDispatch({
    type: types.DELETE_RESERVE_STOCK_PROCESS,
    payload: data,
  });
  return {
    type: types.DELETE_RESERVE_STOCK_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => delete reserve stock success */
export const deleteReserveStockSuccess = (
  data: models.DeleteSuccessProps,
): models.DeleteSuccessAction => {
  return { type: types.DELETE_RESERVE_STOCK_SUCCESS, payload: data };
};
/** => delete reserve stock failed */
export const deleteReserveStockFailed = (
  data: models.ErrorProps,
): models.DeleteFailedAction => {
  return { type: types.DELETE_RESERVE_STOCK_FAILED, payload: data };
};
/** === CREATE RESERVE STOCK === */
/** => create reserve stock process */
export const createReserveStockProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<{}>,
): models.CreateProcessAction => {
  contextDispatch({
    type: types.CREATE_RESERVE_STOCK_PROCESS,
    payload: data,
  });
  return {
    type: types.CREATE_RESERVE_STOCK_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => create reserve stock success */
export const createReserveStockSuccess = (
  data: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.CREATE_RESERVE_STOCK_SUCCESS, payload: data };
};
/** => create reserve stock failed */
export const createReserveStockFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CREATE_RESERVE_STOCK_FAILED, payload: data };
};
