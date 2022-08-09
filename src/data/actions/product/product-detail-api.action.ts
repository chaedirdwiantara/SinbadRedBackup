/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const productDetailProcess = (
  contextDispatch: (action: any) => any,
  payload: models.DetailProductProcess,
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
  payload: models.DetailSuccessProps<models.ProductDetail>,
): models.DetailSuccessAction<models.ProductDetail> => {
  return { type: types.PRODUCT_DETAIL_SUCCESS, payload };
};
/** => Failed */
export const productDetailFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.PRODUCT_DETAIL_FAILED, payload };
};
/** => Refresh */
export const productDetailRefresh = () => {
  return { type: types.PRODUCT_DETAIL_REFRESH };
};
/** => Reset */
export const productDetailReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.PRODUCT_DETAIL_RESET });
  return { type: types.PRODUCT_DETAIL_RESET };
};
/** => Process */
export const productDetailCartProcess = (
  contextDispatch: (action: any) => any,
  payload: models.DetailProcessProps,
): models.DetailProcessAction => {
  contextDispatch({ type: types.PRODUCT_DETAIL_CART_PROCESS, payload });
  return {
    type: types.PRODUCT_DETAIL_CART_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const productDetailCartSuccess = (
  payload: models.DetailSuccessProps<models.ProductDetail>,
): models.DetailSuccessAction<models.ProductDetail> => {
  return { type: types.PRODUCT_DETAIL_CART_SUCCESS, payload };
};
/** => Failed */
export const productDetailCartFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.PRODUCT_DETAIL_CART_FAILED, payload };
};
/** => Refresh */
export const productDetailCartRefresh = () => {
  return { type: types.PRODUCT_DETAIL_CART_REFRESH };
};
/** => Reset */
export const productDetailCartReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.PRODUCT_DETAIL_CART_RESET });
  return { type: types.PRODUCT_DETAIL_CART_RESET };
};
