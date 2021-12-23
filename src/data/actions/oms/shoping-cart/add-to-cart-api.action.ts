import * as types from '@types';
import * as models from '@models';
/** === SEND DATA TO SUPPLIER === */
/** => Process */
export const addToCartProcess = (
  contextDispatch: (action: any) => any,
  payload: models.CreateProcessProps<models.AddToCartPayload>,
): models.CreateProcessAction<models.AddToCartPayload> => {
  contextDispatch({
    type: types.ADD_TO_CART_PROCESS,
    payload,
  });
  return {
    type: types.ADD_TO_CART_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const addToCartSuccess = (
  payload: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.ADD_TO_CART_SUCCESS, payload };
};
/** => Failed */
export const addToCartFailed = (
  payload: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.ADD_TO_CART_FAILED, payload };
};
/** => Refresh */
export const addToCartRefresh = () => {
  return { type: types.ADD_TO_CART_REFRESH };
};
/** => Reset */
export const addToCartReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({
    type: types.ADD_TO_CART_RESET,
  });
  return { type: types.ADD_TO_CART_RESET };
};

/** => Process */
export const addToCartDetailProcess = (
  contextDispatch: (action: any) => any,
  payload: models.CreateProcessProps<models.AddToCartPayload>,
): models.CreateProcessAction<models.AddToCartPayload> => {
  contextDispatch({
    type: types.ADD_TO_CART_DETAIL_PROCESS,
    payload,
  });
  return {
    type: types.ADD_TO_CART_DETAIL_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const addToCartDetailSuccess = (
  payload: models.CreateSuccessProps,
): models.CreateSuccessAction => {
  return { type: types.ADD_TO_CART_DETAIL_SUCCESS, payload };
};
/** => Failed */
export const addToCartDetailFailed = (
  payload: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.ADD_TO_CART_DETAIL_FAILED, payload };
};
/** => Refresh */
export const addToCartDetailRefresh = () => {
  return { type: types.ADD_TO_CART_DETAIL_REFRESH };
};
/** => Reset */
export const addToCartDetailReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({
    type: types.ADD_TO_CART_DETAIL_RESET,
  });
  return { type: types.ADD_TO_CART_DETAIL_RESET };
};
