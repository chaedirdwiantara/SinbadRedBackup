import * as types from '@types';
import * as models from '@models';

/** === ACTION === */
/** => PROCESS */
export const postCheckStockProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<models.CheckStockPayload>,
): models.CreateProcessAction<models.CheckStockPayload> => {
  contextDispatch({
    type: types.POST_CHECK_STOCK_PROCESS,
    payload: data,
  });
  return {
    type: types.POST_CHECK_STOCK_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => SUCCESS */
export const postCheckStockSuccess = (
  data: models.CreateSuccessV3Props<models.CheckStockResponse[]>,
): models.CreateSuccessV3Action<models.CheckStockResponse[]> => {
  return { type: types.POST_CHECK_STOCK_SUCCESS, payload: data };
};
/** => FAILED */
export const postCheckStockFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.POST_CHECK_STOCK_FAILED, payload: data };
};
/** => RESET */
export const postCheckStockReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.POST_CHECK_STOCK_RESET });
  return { type: types.POST_CHECK_STOCK_RESET };
};
