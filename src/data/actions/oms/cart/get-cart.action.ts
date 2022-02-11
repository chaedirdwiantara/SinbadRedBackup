/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => PROCESS */
export const getCartProcess = (
  contextDispatch: (action: any) => any,
): Omit<models.DetailProcessAction, 'payload'> => {
  contextDispatch({ type: types.GET_CART_PROCESS });
  return {
    type: types.GET_CART_PROCESS,
    contextDispatch,
  };
};
/** => SUCCESS */
export const getCartSuccess = (
  payload: models.DetailSuccessProps<models.GetCart>,
): models.DetailSuccessAction<models.GetCart> => {
  return { type: types.GET_CART_SUCCESS, payload };
};
/** => FAILED */
export const getCartFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.GET_CART_FAILED, payload };
};
/** => RESET */
export const getCartReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.GET_CART_RESET });
  return { type: types.GET_CART_RESET };
};
