/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => PROCESS */
export const cartExampleProcess = (
  contextDispatch: (action: any) => any,
): Omit<models.DetailProcessAction, 'payload'> => {
  contextDispatch({ type: types.CART_EXAMPLE_PROCESS });
  return {
    type: types.CART_EXAMPLE_PROCESS,
    contextDispatch,
  };
};
/** => SUCCESS */
export const cartExampleSuccess = (
  payload: models.DetailSuccessProps<models.CartExample>,
): models.DetailSuccessAction<models.CartExample> => {
  return { type: types.CART_EXAMPLE_SUCCESS, payload };
};
/** => FAILED */
export const cartExampleFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.CART_EXAMPLE_FAILED, payload };
};
/** => RESET */
export const cartExampleReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.CART_EXAMPLE_RESET });
  return { type: types.CART_EXAMPLE_RESET };
};
