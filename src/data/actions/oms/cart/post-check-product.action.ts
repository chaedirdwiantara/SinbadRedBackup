import * as types from '@types';
import * as models from '@models';

/** === ACTION === */
/** => PROCESS */
export const postCheckProductProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<models.CheckProductPayload>,
): models.CreateProcessAction<models.CheckProductPayload> => {
  contextDispatch({
    type: types.POST_CHECK_PRODUCT_PROCESS,
    payload: data,
  });
  return {
    type: types.POST_CHECK_PRODUCT_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => SUCCESS */
export const postCheckProductSuccess = (
  data: models.CreateSuccessV3Props<models.CheckProductResponse[]>,
): models.CreateSuccessV3Action<models.CheckProductResponse[]> => {
  return { type: types.POST_CHECK_PRODUCT_SUCCESS, payload: data };
};
/** => FAILED */
export const postCheckProductFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.POST_CHECK_PRODUCT_FAILED, payload: data };
};
/** => RESET */
export const postCheckProductReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.POST_CHECK_PRODUCT_RESET });
  return { type: types.POST_CHECK_PRODUCT_RESET };
};
