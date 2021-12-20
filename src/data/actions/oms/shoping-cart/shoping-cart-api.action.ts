/** === IMPORT INTERNAL === */
import * as models from '@models';
import * as types from '@types';
/** === ACTIONS === */
/** => Process */
export const cartViewProcess = (
  contextDispatch: (action: any) => any,
): Omit<models.DetailProcessAction, 'payload'> => {
  contextDispatch({ type: types.CART_VIEW_PROCESS });
  return {
    type: types.CART_VIEW_PROCESS,
    contextDispatch,
  };
};
/** => Success */
export const cartViewSuccess = (
  payload: models.DetailSuccessProps<models.CartSuccessProps>,
): models.DetailSuccessAction<models.CartSuccessProps> => {
  return { type: types.CART_VIEW_SUCCESS, payload };
};
/** => Failed */
export const cartViewFailed = (
  payload: models.ErrorProps,
): models.DetailFailedAction => {
  return { type: types.CART_VIEW_FAILED, payload };
};
/** => Reset */
export const cartViewReset = (contextDispatch: (action: any) => any) => {
  contextDispatch({ type: types.CART_VIEW_RESET });
  return { type: types.CART_VIEW_RESET };
};
