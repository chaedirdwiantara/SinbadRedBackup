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
/** => delete reserve stock reset */
export const deleteReserveStockReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({
    type: types.DELETE_RESERVE_STOCK_RESET,
  });
  return { type: types.DELETE_RESERVE_STOCK_RESET };
};
/** === CREATE RESERVE STOCK === */
/** => create reserve stock process */
export const createReserveStockProcess = (
  contextDispatch: (action: any) => any,
  data: models.ReserveStockPayload,
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
/** => create reserve stock reset */
export const createReserveStockReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({
    type: types.CREATE_RESERVE_STOCK_RESET,
  });
  return { type: types.CREATE_RESERVE_STOCK_RESET };
};

/** === DETAIL RESERVE STOCK === */
/** => detail reserve stock process */
export const detailReserveStockProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({
    type: types.DETAIL_RESERVE_STOCK_PROCESS,
    payload: data,
  });
  return {
    type: types.DETAIL_RESERVE_STOCK_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => detail reserve stock success */
export const detailReserveStockSuccess = (
  data: models.DetailSuccessProps<models.ReserveStockError>,
): models.DetailSuccessAction<models.ReserveStockError> => {
  return { type: types.DETAIL_RESERVE_STOCK_SUCCESS, payload: data };
};
/** => detail reserve stock failed */
export const detailReserveStockFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.DETAIL_RESERVE_STOCK_FAILED, payload: data };
};
/** => detail reserve stock reset */
export const detailReserveStockReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({
    type: types.DETAIL_RESERVE_STOCK_RESET,
  });
  return { type: types.DETAIL_RESERVE_STOCK_RESET };
};
