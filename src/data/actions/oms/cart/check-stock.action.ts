import * as types from '@types';
import * as models from '@models';

/** === ACTION === */
/** => PROCESS */
export const checkStockProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<models.CheckStockPayload>,
): models.CreateProcessAction<models.CheckStockPayload> => {
  contextDispatch({
    type: types.CHECK_STOCK_PROCESS,
    payload: data,
  });
  return {
    type: types.CHECK_STOCK_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => SUCCESS */
export const checkStockSuccess = (
  data: models.CreateSuccessV3Props<models.CheckStockResponse[]>,
): models.CreateSuccessV3Action<models.CheckStockResponse[]> => {
  return { type: types.CHECK_STOCK_SUCCESS, payload: data };
};
/** => FAILED */
export const checkStockFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CHECK_STOCK_FAILED, payload: data };
};
/** => RESET */
export const checkStockReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.CHECK_STOCK_RESET });
  return { type: types.CHECK_STOCK_RESET };
};
