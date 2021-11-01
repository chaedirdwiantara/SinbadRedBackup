import * as types from '@types';
import * as models from '@models';

/** product detail process */
export const productDetailProcess = (
  contextDispatch: (action: any) => any,
  payload: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types.PRODUCT_DETAIL_PROCESS, payload });
  return {
    type: types.PRODUCT_DETAIL_PROCESS,
    payload,
    contextDispatch,
  };
};
/** product detail success */
export const productDetailSuccess = (
  payload: models.DetailSuccessProps<models.ProductDetailSuccessProps>,
): models.DetailSuccessAction<models.ProductDetailSuccessProps> => {
  return { type: types.PRODUCT_DETAIL_SUCCESS, payload };
};
/** product detail failed */
export const productDetailFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.PRODUCT_LIST_FAILED, payload };
};
/** product detail reset */
export const productDetailReset = () => {
  return { type: types.PRODUCT_DETAIL_RESET };
};
