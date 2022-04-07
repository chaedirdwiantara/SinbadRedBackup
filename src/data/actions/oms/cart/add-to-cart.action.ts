import * as types from '@types';
import * as models from '@models';

/** === ACTION === */
/** => PROCESS */
export const addToCartProcess = (
  contextDispatch: (action: any) => any,
  data: models.CreateProcessProps<models.AddToCartPayload>,
): models.CreateProcessAction<models.AddToCartPayload> => {
  contextDispatch({
    type: types.ADD_TO_CART_PROCESS,
    payload: data,
  });
  return {
    type: types.ADD_TO_CART_PROCESS,
    payload: data,
    contextDispatch,
  };
};
/** => SUCCESS */
export const addToCartSuccess = (
  data: models.CreateSuccessV3Props<models.AddToCartResponse>,
): models.CreateSuccessV3Action<models.AddToCartResponse> => {
  return { type: types.ADD_TO_CART_SUCCESS, payload: data };
};
/** => FAILED */
export const addToCartFailed = (
  data: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.ADD_TO_CART_FAILED, payload: data };
};
/** => RESET */
export const addToCartReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.ADD_TO_CART_RESET });
  return { type: types.ADD_TO_CART_RESET };
};
