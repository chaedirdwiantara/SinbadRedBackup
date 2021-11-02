/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
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
/** => Succeeded */
export const productDetailSuccess = (
  payload: models.DetailSuccessProps<models.ProductDetailSuccessProps>,
): models.DetailSuccessAction<models.ProductDetailSuccessProps> => {
  return { type: types.PRODUCT_DETAIL_SUCCESS, payload };
};
/** => Failed */
export const productDetailFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.PRODUCT_LIST_FAILED, payload };
};
/** => Reset */
export const productDetailReset = () => {
  return { type: types.PRODUCT_DETAIL_RESET };
};
