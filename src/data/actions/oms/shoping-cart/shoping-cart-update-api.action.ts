import * as types from '@types';
import * as models from '@models';
/** === CART UPDATE === */
/** => Process */
export const cartUpdateProcess = (
  contextDispatch: (action: any) => any,
  payload: models.UpdateProcessProps<models.CartUpdatePayload>,
): models.UpdateProcessAction<models.CartUpdatePayload> => {
  contextDispatch({
    type: types.CART_UPDATE_PROCESS,
    payload,
  });
  return {
    type: types.CART_UPDATE_PROCESS,
    payload,
    contextDispatch,
  };
};
/** => Succeeded */
export const cartUpdateSuccess = (
  payload: models.UpdateSuccessProps,
): models.UpdateSuccessAction => {
  return { type: types.CART_UPDATE_SUCCESS, payload };
};
/** => Failed */
export const cartUpdateFailed = (
  payload: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CART_UPDATE_FAILED, payload };
};
/** => Refresh */
export const cartUpdateRefresh = () => {
  return { type: types.CART_UPDATE_REFRESH };
};
/** => Reset */
export const cartUpdateReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({
    type: types.CART_UPDATE_RESET,
  });
  return { type: types.CART_UPDATE_RESET };
};
