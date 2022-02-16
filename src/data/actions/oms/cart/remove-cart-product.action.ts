import * as types from '@types';
import * as models from '@models';

/** === ACTION === */
/** => PROCESS */
export const removeCartProductProcess = (
  contextDispatch: (action: any) => any,
  data: models.UpdateProcessProps<models.RemoveCartProductPayload>,
): models.UpdateProcessAction<models.RemoveCartProductPayload> => {
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
  data: models.UpdateSuccessV3Props<models.RemoveCartProductResponse>,
): models.UpdateSuccessV3Action<models.RemoveCartProductResponse> => {
  return { type: types.REMOVE_CART_PRODUCT_SUCCESS, payload: data };
};

/** => FAILED */
export const removeCartProductFailed = (
  data: models.ErrorProps,
): models.UpdateFailedAction => {
  return { type: types.REMOVE_CART_PRODUCT_FAILED, payload: data };
};

/** => RESET */
export const removeCartProductReset = (
  contextDispatch: (action: any) => any,
) => {
  contextDispatch({ type: types.REMOVE_CART_PRODUCT_RESET });
  return { type: types.REMOVE_CART_PRODUCT_RESET };
};
