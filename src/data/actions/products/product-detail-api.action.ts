import * as types from '@types';
import * as models from '@models';

/** product detail process */
export const productDetailProcess = (
  contextDispatch: (action: any) => any,
  data: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types.PRODUCT_DETAIL_PROCESS, payload: data });
  return {
    type: types.PRODUCT_DETAIL_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** product detail success */
export const productDetailSuccess = (
  data: models.DetailSuccessProps<models.ProductDetailSuccessProps>,
): models.DetailSuccessAction<models.ProductDetailSuccessProps> => {
  return { type: types.PRODUCT_DETAIL_SUCCESS, payload: data };
};
/** product detail failed */
export const productDetailFailed = (
  data: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.PRODUCT_LIST_FAILED, payload: data };
};
/** product detail reset */
export const productDetailReset = () => {
  return { type: types.PRODUCT_DETAIL_RESET };
};
