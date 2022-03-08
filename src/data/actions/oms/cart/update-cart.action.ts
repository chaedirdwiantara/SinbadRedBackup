import * as types from '@types';
import * as models from '@models';

/** === ACTION === */
/** => PROCESS */
export const updateCartProcess = (
  contextDispatch: (action: any) => any,
  data: models.UpdateProcessProps<models.UpdateCartPayload>,
): models.UpdateProcessAction<models.UpdateCartPayload> => {
  contextDispatch({
    type: types.UPDATE_CART_PROCESS,
    payload: data,
  });
  return {
    type: types.UPDATE_CART_PROCESS,
    payload: data,
    contextDispatch,
  };
};

/** => SUCCESS */
export const updateCartSuccess = (
  data: models.UpdateSuccessV3Props<models.UpdateCartResponse>,
): models.UpdateSuccessV3Action<models.UpdateCartResponse> => {
  return { type: types.UPDATE_CART_SUCCESS, payload: data };
};

/** => FAILED */
export const updateCartFailed = (
  data: models.ErrorProps,
): models.UpdateFailedAction => {
  return { type: types.UPDATE_CART_FAILED, payload: data };
};

/** => RESET */
export const updateCartReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.UPDATE_CART_RESET });
  return { type: types.UPDATE_CART_RESET };
};
