import * as types from '@types';
import * as models from '@models';
/** === SEND DATA TO SUPPLIER === */
/** => Process */
export const addToCartProcess = (
  contextDispatch: (action: any) => any,
  payload: models.CreateProcessProps<{}>,
): models.CreateProcessAction => {
  contextDispatch({
    type: types.ADD_TO_CART_PROCESS,
    payload,
  });
  return {
    type: types.ADD_TO_CART_PROCESS,
    payload: payload.data,
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
export const addToCartReset = () => {
  return { type: types.ADD_TO_CART_RESET };
};
