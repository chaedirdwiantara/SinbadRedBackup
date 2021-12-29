import * as types from '@types';
import * as models from '@models';
/** === CART UPDATE === */
/** => Process */
export const cartCheckedoutProcess = (
  contextDispatch: (action: any) => any,
): Omit<models.UpdateProcessAction<{}>, 'payload'> => {
  contextDispatch({
    type: types.CART_CHECKEDOUT_PROCESS,
  });
  return {
    type: types.CART_CHECKEDOUT_PROCESS,
    contextDispatch,
  };
};
/** => Succeeded */
export const cartCheckedoutSuccess = (
  payload: models.UpdateSuccessProps,
): models.UpdateSuccessAction => {
  return { type: types.CART_CHECKEDOUT_SUCCESS, payload };
};
/** => Failed */
export const cartCheckedoutFailed = (
  payload: models.ErrorProps,
): models.CreateFailedAction => {
  return { type: types.CART_CHECKEDOUT_FAILED, payload };
};
/** => Refresh */
export const cartCheckedoutRefresh = () => {
  return { type: types.CART_CHECKEDOUT_REFRESH };
};
/** => Reset */
export const cartCheckedoutReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({
    type: types.CART_CHECKEDOUT_RESET,
  });
  return { type: types.CART_CHECKEDOUT_RESET };
};
