import * as types from '@types';
import * as models from '@models';

/** === ACTION === */
/** => PROCESS */
export const checkProductProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<models.CheckProductPayload>,
): models.CreateProcessAction<models.CheckProductPayload> => {
  contextDispatch({
    type: types.CHECK_PRODUCT_PROCESS,
    payload: data,
  });
  return {
    type: types.CHECK_PRODUCT_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => SUCCESS */
export const checkProductSuccess = (
  data: models.CreateSuccessV3Props<models.CheckProductResponse[]>,
): models.CreateSuccessV3Action<models.CheckProductResponse[]> => {
  return { type: types.CHECK_PRODUCT_SUCCESS, payload: data };
};
/** => FAILED */
export const checkProductFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CHECK_PRODUCT_FAILED, payload: data };
};
/** => RESET */
export const checkProductReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.CHECK_PRODUCT_RESET });
  return { type: types.CHECK_PRODUCT_RESET };
};
