import * as types from '@types';
import * as models from '@models';

/** === ACTION === */
/** => PROCESS */
export const removeCartProductProcess = (
  contextDispatch: (action: any) => any,
  data: models.DeleteProcessProps,
): models.DeleteProcessAction => {
  contextDispatch({
    type: types.REMOVE_CART_PRODUCT_PROCESS,
    payload: data,
  });
  return {
    type: types.REMOVE_CART_PRODUCT_PROCESS,
    payload: data,
    contextDispatch,
  };
};

/** => SUCCESS */
export const removeCartProductSuccess = (
  data: models.DeleteSuccessV3Props,
): models.DeleteSuccessV3Action => {
  return { type: types.REMOVE_CART_PRODUCT_SUCCESS, payload: data };
};

/** => FAILED */
export const removeCartProductFailed = (
  data: models.ErrorProps,
): models.DeleteFailedAction => {
  return { type: types.REMOVE_CART_PRODUCT_FAILED, payload: data };
};

/** => RESET */
export const removeCartProductReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.REMOVE_CART_PRODUCT_RESET });
  return { type: types.REMOVE_CART_PRODUCT_RESET };
};
